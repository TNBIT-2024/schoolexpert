-- =====================================================================
-- Supabase Schema Setup for SchoolExpert Community
-- =====================================================================
-- Instructions:
-- 1. Go to your Supabase Dashboard (https://supabase.com).
-- 2. Open your project, click on "SQL Editor" in the left sidebar.
-- 3. Click "New Query", paste the entire contents of this file, and click "Run".
-- =====================================================================

-- ── 1. DROP EXISTING TABLES IF ANY (ORDER SENSITIVE) ──────────────────
DROP TABLE IF EXISTS chat_messages CASCADE;
DROP TABLE IF EXISTS forum_likes CASCADE;
DROP TABLE IF EXISTS forum_comments CASCADE;
DROP TABLE IF EXISTS forum_posts CASCADE;

-- ── 2. CREATE forum_posts TABLE ───────────────────────────────────────
CREATE TABLE forum_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    author_name TEXT NOT NULL,
    author_role TEXT,
    author_avatar TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── 3. CREATE forum_comments TABLE ────────────────────────────────────
CREATE TABLE forum_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE NOT NULL,
    author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    author_name TEXT NOT NULL,
    author_role TEXT,
    author_avatar TEXT,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── 4. CREATE forum_likes TABLE ───────────────────────────────────────
CREATE TABLE forum_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT unique_post_user_like UNIQUE (post_id, user_id)
);

-- ── 5. CREATE chat_messages TABLE ─────────────────────────────────────
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    user_name TEXT NOT NULL,
    user_role TEXT,
    user_avatar TEXT,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── 6. ENABLE ROW LEVEL SECURITY (RLS) ────────────────────────────────
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- ── 7. RLS POLICIES FOR forum_posts ───────────────────────────────────
CREATE POLICY "Allow anyone to read posts" ON forum_posts
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to create posts" ON forum_posts
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow users to update their own posts" ON forum_posts
    FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Allow users to delete their own posts" ON forum_posts
    FOR DELETE USING (auth.uid() = author_id);

-- ── 8. RLS POLICIES FOR forum_comments ────────────────────────────────
CREATE POLICY "Allow anyone to read comments" ON forum_comments
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to write comments" ON forum_comments
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow users to delete their own comments" ON forum_comments
    FOR DELETE USING (auth.uid() = author_id);

-- ── 9. RLS POLICIES FOR forum_likes ───────────────────────────────────
CREATE POLICY "Allow anyone to see likes" ON forum_likes
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to toggle likes" ON forum_likes
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow users to remove their own likes" ON forum_likes
    FOR DELETE USING (auth.uid() = user_id);

-- ── 10. RLS POLICIES FOR chat_messages ────────────────────────────────
CREATE POLICY "Allow anyone to read chat messages" ON chat_messages
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to post chat messages" ON chat_messages
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- ── 11. ENABLE REALTIME REPLICATION ──────────────────────────────────
-- This enables Supabase to push database changes in realtime to the client
-- Since we dropped the tables at the start of the script, they are automatically
-- removed from any publications, so we can now safely add them back.
alter publication supabase_realtime add table forum_posts, forum_comments, forum_likes, chat_messages;

-- ── 12. SEED SEED DATA (INITIAL POSTS AND COMMENTS) ───────────────────
-- Seed Posts
INSERT INTO forum_posts (id, title, content, category, author_name, author_role, author_avatar, created_at) VALUES
('b3c8f85f-846d-4eb7-be07-c257b45f1b51', 'CBSE vs ICSE for primary school in Bangalore?', 'We are moving to Bangalore next month and looking for a primary school for our 6-year-old. I am confused between CBSE and ICSE boards. CBSE seems better for future national competitive exams, but ICSE focuses heavily on English language and literature. Any suggestions based on your experiences?', 'CBSE vs ICSE', 'Rohan Sharma', 'Parent of 1 child', 'RS', now() - interval '2 hours'),
('4e8838a0-2f95-46f3-a1ef-267f566418ef', 'Greenwood High vs Jain International - Admission feedback?', 'Has anyone secured admission at Jain International for 2026? Wanted to check how the interview process works for Grade 5, and if they place heavy emphasis on extracurricular portfolios during entry assessment.', 'Admissions', 'Meera Deshmukh', 'Parent of Grade 5 student', 'MD', now() - interval '5 hours'),
('cf9b8281-a7b2-4d43-85f0-bd4e24eb482a', 'Importance of sports infrastructure in school decision', 'Is a 5-acre sports ground really a necessity? Some schools in central cities have very small playgrounds but claim to have top academic tie-ups. How much should we prioritize physical sports space in primary years?', 'Extracurriculars', 'Suresh Menon', 'Parent of 2 boys', 'SM', now() - interval '1 day');

-- Seed Comments
INSERT INTO forum_comments (id, post_id, author_name, author_role, author_avatar, content, created_at) VALUES
('33261a87-cdcc-41f2-bf6d-965d1d6e1fa0', 'b3c8f85f-846d-4eb7-be07-c257b45f1b51', 'Anjali Hegde', 'Parent of 2 children', 'AH', 'I had the same confusion. We chose ICSE for primary years. The focus on analytical thinking and language development is outstanding. You can always switch to CBSE in 8th/9th grade if they want to focus heavily on IIT-JEE prep!', now() - interval '1 hour'),
('9b7b93df-4fe3-4467-9c97-6a75fbf10411', 'b3c8f85f-846d-4eb7-be07-c257b45f1b51', 'Dr. Vivek Verma', 'Education Consultant', 'VV', 'Both have merits. CBSE syllabus is more aligned with NCERT, which directly maps to JEE/NEET. ICSE has a broader range of subjects and builds stronger communication skills. Choose based on your child’s learning style.', now() - interval '45 minutes'),
('707cb6eb-8e50-4824-a78d-e6b81c2014ce', '4e8838a0-2f95-46f3-a1ef-267f566418ef', 'Karthik Rao', 'Parent of Grade 6 student', 'KR', 'Jain International focuses a lot on overall personality. The test covers basic math and language skill metrics, followed by a friendly chat with the principal. They definitely look at sporting or cultural interests positively!', now() - interval '3 hours'),
('f6b8df81-a75d-4f3b-8531-15cb3a54b38d', 'cf9b8281-a7b2-4d43-85f0-bd4e24eb482a', 'Priyanka Sen', 'Physical Educator', 'PS', 'Playgrounds build social skills, physical health, and teamwork. For primary students, running space is highly critical. Academic results are important, but don’t compromise entirely on physical movement!', now() - interval '18 hours');

-- ── 13. PROFILE PICTURE STORAGE & SCHEMA SETUP ────────────────────────
-- Add avatar_url column to the profiles table (if not exists)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Create a storage bucket for avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to avatars
DROP POLICY IF EXISTS "Allow public read access to avatars" ON storage.objects;
CREATE POLICY "Allow public read access to avatars" ON storage.objects
    FOR SELECT USING (bucket_id = 'avatars');

-- Allow authenticated users to upload avatars
DROP POLICY IF EXISTS "Allow authenticated users to upload avatars" ON storage.objects;
CREATE POLICY "Allow authenticated users to upload avatars" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

-- Allow users to update their own avatars
DROP POLICY IF EXISTS "Allow users to update their own avatars" ON storage.objects;
CREATE POLICY "Allow users to update their own avatars" ON storage.objects
    FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to delete their own avatars
DROP POLICY IF EXISTS "Allow users to delete their own avatars" ON storage.objects;
CREATE POLICY "Allow users to delete their own avatars" ON storage.objects
    FOR DELETE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Link forum_posts and forum_comments author_id to profiles table for joins
ALTER TABLE forum_posts 
DROP CONSTRAINT IF EXISTS fk_forum_posts_author_profiles,
ADD CONSTRAINT fk_forum_posts_author_profiles
FOREIGN KEY (author_id) REFERENCES profiles(id) ON DELETE SET NULL;

ALTER TABLE forum_comments
DROP CONSTRAINT IF EXISTS fk_forum_comments_author_profiles,
ADD CONSTRAINT fk_forum_comments_author_profiles
FOREIGN KEY (author_id) REFERENCES profiles(id) ON DELETE SET NULL;

-- ── 14. COMPREHENSIVE PROFILES TABLE (NULLABLE EMAIL), TRIGGER, AND VIEW SETUP 
-- Create public.profiles table if it does not exist
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    email TEXT,
    phone TEXT,
    city TEXT,
    user_type TEXT,
    service_type TEXT,
    avatar_url TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Safely add/ensure all required columns exist in public.profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS user_type TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS service_type TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Drop NOT NULL constraint on email column if it exists to prevent sign-up blocks
ALTER TABLE public.profiles ALTER COLUMN email DROP NOT NULL;

-- Enable Row Level Security (RLS) on public.profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Configure RLS policies for public.profiles
DROP POLICY IF EXISTS "Allow public read access to profiles" ON public.profiles;
CREATE POLICY "Allow public read access to profiles" ON public.profiles
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow users to update their own profile" ON public.profiles;
CREATE POLICY "Allow users to update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Update trigger function to extract all fields (including email) on sign up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    name, 
    email,
    phone, 
    city, 
    user_type, 
    service_type, 
    avatar_url
  )
  VALUES (
    new.id,
    new.raw_user_meta_data->>'name',
    new.email, -- Safely map from auth.users email field
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'city',
    new.raw_user_meta_data->>'user_type',
    new.raw_user_meta_data->>'service_type',
    new.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO UPDATE SET
    name = excluded.name,
    email = excluded.email,
    phone = excluded.phone,
    city = excluded.city,
    user_type = excluded.user_type,
    service_type = excluded.service_type,
    avatar_url = excluded.avatar_url;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Clean up any other conflicting triggers on auth.users from other templates
DROP TRIGGER IF EXISTS on_auth_user_signup ON auth.users;
DROP TRIGGER IF EXISTS on_user_created ON auth.users;
DROP TRIGGER IF EXISTS sync_user_profile ON auth.users;
DROP TRIGGER IF EXISTS profiles_trigger ON auth.users;

-- Recreate trigger to run on new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create a View to query and display all registered School Users
CREATE OR REPLACE VIEW public.school_users_view AS
SELECT 
  p.id,
  p.name,
  u.email,
  p.phone,
  p.city,
  p.avatar_url,
  u.created_at
FROM public.profiles p
JOIN auth.users u ON p.id = u.id
WHERE p.user_type = 'school';



