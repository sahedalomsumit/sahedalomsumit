-- =============================================
-- Migration: Reset blog post views to 0 & Enable Supabase Realtime
-- =============================================

-- Reset all existing blog posts to 0 views (organic dynamic counting)
UPDATE blog_posts SET views = 0;

-- Ensure replica identity is full so realtime payload includes all columns
ALTER TABLE blog_posts REPLICA IDENTITY FULL;

-- Add blog_posts table to supabase_realtime publication
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'blog_posts'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE blog_posts;
  END IF;
END $$;
