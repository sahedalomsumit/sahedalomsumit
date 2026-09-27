-- ==============================================================================
-- Migration: Blog Posts Automation, Defaults, Triggers, & Studio Configurations
-- ==============================================================================

-- 1. Helper function to create clean hyphenated slugs
CREATE OR REPLACE FUNCTION slugify_title(title_text TEXT)
RETURNS TEXT AS $$
DECLARE
  clean_slug TEXT;
BEGIN
  IF title_text IS NULL OR trim(title_text) = '' THEN
    RETURN 'post-' || floor(extract(epoch from now()))::TEXT;
  END IF;

  -- Convert to lowercase, replace non-alphanumeric characters with hyphens
  clean_slug := lower(trim(regexp_replace(regexp_replace(title_text, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g')));
  -- Deduplicate multiple hyphens
  clean_slug := regexp_replace(clean_slug, '-+', '-', 'g');
  -- Strip leading or trailing hyphens
  clean_slug := trim(both '-' from clean_slug);

  IF clean_slug = '' THEN
    clean_slug := 'post-' || floor(extract(epoch from now()))::TEXT;
  END IF;

  RETURN clean_slug;
END;
$$ LANGUAGE plpgsql VOLATILE;

-- 2. Alter column default constraints on blog_posts
ALTER TABLE blog_posts 
  ALTER COLUMN cover_image SET DEFAULT '/img/portfolio/thumbnail-temp.webp',
  ALTER COLUMN reading_time SET DEFAULT '3 mins read',
  ALTER COLUMN author_name SET DEFAULT 'Sahed Alom Sumit',
  ALTER COLUMN author_role SET DEFAULT 'Product Designer & AI-Enhanced Web Developer',
  ALTER COLUMN author_avatar SET DEFAULT '/img/sahedalomsumit-profile-purple.png',
  ALTER COLUMN tags SET DEFAULT ARRAY['#SahedAlomSumit', '#ProductDesign', '#ProductDevelopment']::TEXT[];

-- 3. Trigger Function: Automatically handle slug, cover image, tags '#', reading time, and SEO defaults
CREATE OR REPLACE FUNCTION handle_blog_posts_automation()
RETURNS TRIGGER AS $$
DECLARE
  formatted_tags TEXT[] := '{}';
  t TEXT;
BEGIN
  -- A. slug: by default make it same title but using hyphens
  IF NEW.slug IS NULL OR trim(NEW.slug) = '' THEN
    NEW.slug := slugify_title(NEW.title);
  ELSE
    NEW.slug := slugify_title(NEW.slug);
  END IF;

  -- B. cover_image: by default make /img/portfolio/thumbnail-temp.webp (support .web typo gracefully)
  IF NEW.cover_image IS NULL OR trim(NEW.cover_image) = '' THEN
    NEW.cover_image := '/img/portfolio/thumbnail-temp.webp';
  ELSIF NEW.cover_image LIKE '%.web' THEN
    NEW.cover_image := replace(NEW.cover_image, '.web', '.webp');
  END IF;

  -- C. reading_time: by default '3 mins read'
  IF NEW.reading_time IS NULL OR trim(NEW.reading_time) = '' THEN
    NEW.reading_time := '3 mins read';
  END IF;

  -- D. author_name & author_role defaults
  IF NEW.author_name IS NULL OR trim(NEW.author_name) = '' THEN
    NEW.author_name := 'Sahed Alom Sumit';
  END IF;
  IF NEW.author_role IS NULL OR trim(NEW.author_role) = '' THEN
    NEW.author_role := 'Product Designer & AI-Enhanced Web Developer';
  END IF;

  -- E. tags: automatic '#' before each tag, multi-select, default to #SahedAlomSumit, #ProductDesign, #ProductDevelopment
  IF NEW.tags IS NULL OR array_length(NEW.tags, 1) IS NULL OR array_length(NEW.tags, 1) = 0 THEN
    NEW.tags := ARRAY['#SahedAlomSumit', '#ProductDesign', '#ProductDevelopment']::TEXT[];
  ELSE
    FOREACH t IN ARRAY NEW.tags LOOP
      IF t IS NOT NULL AND trim(t) <> '' THEN
        IF left(trim(t), 1) <> '#' THEN
          formatted_tags := array_append(formatted_tags, '#' || trim(t));
        ELSE
          formatted_tags := array_append(formatted_tags, trim(t));
        END IF;
      END IF;
    END LOOP;
    IF array_length(formatted_tags, 1) > 0 THEN
      NEW.tags := formatted_tags;
    ELSE
      NEW.tags := ARRAY['#SahedAlomSumit', '#ProductDesign', '#ProductDevelopment']::TEXT[];
    END IF;
  END IF;

  -- F. seo_title: by default use blog's title
  IF NEW.seo_title IS NULL OR trim(NEW.seo_title) = '' THEN
    NEW.seo_title := NEW.title;
  END IF;

  -- G. seo_description: by default use blog's short description (excerpt)
  IF NEW.seo_description IS NULL OR trim(NEW.seo_description) = '' THEN
    NEW.seo_description := NEW.excerpt;
  END IF;

  -- H. Timestamps
  NEW.updated_at := now();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Attach Trigger to blog_posts
DROP TRIGGER IF EXISTS trg_blog_posts_automation ON blog_posts;
CREATE TRIGGER trg_blog_posts_automation
BEFORE INSERT OR UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION handle_blog_posts_automation();

-- 5. Helper reference tables for Supabase Studio Table Editor dropdown lookups
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on blog_categories" ON blog_categories FOR SELECT USING (true);

INSERT INTO blog_categories (name) VALUES
  ('AI & Automation'),
  ('Design Systems'),
  ('Engineering'),
  ('UI/UX Design')
ON CONFLICT (name) DO NOTHING;

CREATE TABLE IF NOT EXISTS blog_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role_name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE blog_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on blog_roles" ON blog_roles FOR SELECT USING (true);

INSERT INTO blog_roles (role_name) VALUES
  ('Product Designer & AI-Enhanced Web Developer'),
  ('Lead Design Engineer'),
  ('Full-Stack Specialist'),
  ('UI/UX Architect')
ON CONFLICT (role_name) DO NOTHING;
