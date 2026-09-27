-- =============================================
-- Migration: Update author avatar and dynamic view counter
-- =============================================

-- Update default author_avatar and set all existing records to sahedalomsumit-profile-purple.png
ALTER TABLE blog_posts ALTER COLUMN author_avatar SET DEFAULT '/img/sahedalomsumit-profile-purple.png';

UPDATE blog_posts
SET author_avatar = '/img/sahedalomsumit-profile-purple.png';

-- Drop previous void return version
DROP FUNCTION IF EXISTS increment_blog_post_views(TEXT);

-- Recreate increment_blog_post_views to return the updated integer view count
CREATE OR REPLACE FUNCTION increment_blog_post_views(post_slug TEXT)
RETURNS INTEGER AS $$
DECLARE
  current_views INTEGER;
BEGIN
  UPDATE blog_posts
  SET views = COALESCE(views, 0) + 1
  WHERE slug = post_slug
  RETURNING views INTO current_views;

  RETURN current_views;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
