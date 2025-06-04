-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_bug_out_bags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Products policies (public read)
CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT USING (true);

-- Articles policies (public read for published)
CREATE POLICY "Anyone can view published articles" ON public.articles
  FOR SELECT USING (published = true);

-- User checklists policies
CREATE POLICY "Users can manage their own checklists" ON public.user_checklists
  FOR ALL USING (auth.uid() = user_id);

-- User bug out bags policies
CREATE POLICY "Users can manage their own bug out bags" ON public.user_bug_out_bags
  FOR ALL USING (auth.uid() = user_id);

-- Product reviews policies
CREATE POLICY "Anyone can view reviews" ON public.product_reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own reviews" ON public.product_reviews
  FOR ALL USING (auth.uid() = user_id);

-- User favorites policies
CREATE POLICY "Users can manage their own favorites" ON public.user_favorites
  FOR ALL USING (auth.uid() = user_id);
