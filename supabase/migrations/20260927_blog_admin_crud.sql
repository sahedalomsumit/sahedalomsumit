-- ==============================================================================
-- Migration: Blog Admin Full CRUD Policies (Select, Insert, Update, Delete)
-- ==============================================================================
-- Run this in your Supabase SQL Editor to enable full administrative management 
-- from /blog/admin and /blog/new.

DO $$
BEGIN
  -- Drop existing restrictive policies if present
  DROP POLICY IF EXISTS "Allow anon read access on published blog posts" ON blog_posts;
  DROP POLICY IF EXISTS "Allow public read access on published blog posts" ON blog_posts;
  DROP POLICY IF EXISTS "Allow authenticated full access on blog posts" ON blog_posts;
  DROP POLICY IF EXISTS "Allow anon insert on blog_posts" ON blog_posts;
  DROP POLICY IF EXISTS "Allow anon update on blog_posts" ON blog_posts;
  DROP POLICY IF EXISTS "Allow anon delete on blog_posts" ON blog_posts;
  DROP POLICY IF EXISTS "Allow full admin read on blog_posts" ON blog_posts;
END $$;

-- Published posts are public; drafts and all mutations are restricted to the
-- verified Supabase Auth administrator. The UI login alone is not an access-control boundary.
CREATE POLICY "Allow public read access on published blog posts" ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Allow admin read access on blog posts" ON blog_posts
  FOR SELECT
  TO authenticated
  USING ((select auth.jwt() ->> 'email') = 'sahedalomsumit@gmail.com');

CREATE POLICY "Allow admin insert on blog_posts" ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.jwt() ->> 'email') = 'sahedalomsumit@gmail.com');

CREATE POLICY "Allow admin update on blog_posts" ON blog_posts
  FOR UPDATE
  TO authenticated
  USING ((select auth.jwt() ->> 'email') = 'sahedalomsumit@gmail.com')
  WITH CHECK ((select auth.jwt() ->> 'email') = 'sahedalomsumit@gmail.com');

CREATE POLICY "Allow admin delete on blog_posts" ON blog_posts
  FOR DELETE
  TO authenticated
  USING ((select auth.jwt() ->> 'email') = 'sahedalomsumit@gmail.com');
