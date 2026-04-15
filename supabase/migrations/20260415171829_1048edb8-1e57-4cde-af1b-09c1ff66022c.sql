-- Create recipes table
CREATE TABLE public.recipes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  ingredients JSONB NOT NULL DEFAULT '[]'::jsonb,
  steps JSONB NOT NULL DEFAULT '[]'::jsonb,
  prep_time INTEGER DEFAULT 30,
  cook_time INTEGER DEFAULT 30,
  servings INTEGER DEFAULT 4,
  difficulty TEXT DEFAULT 'medium',
  calories INTEGER,
  protein NUMERIC,
  carbs NUMERIC,
  fat NUMERIC,
  image_url TEXT,
  video_url TEXT,
  author_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create recipe comments table with threading
CREATE TABLE public.recipe_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  recipe_id UUID NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  parent_id UUID REFERENCES public.recipe_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_recipes_slug ON public.recipes(slug);
CREATE INDEX idx_recipes_status ON public.recipes(status);
CREATE INDEX idx_recipes_author ON public.recipes(author_id);
CREATE INDEX idx_recipe_comments_recipe ON public.recipe_comments(recipe_id);
CREATE INDEX idx_recipe_comments_parent ON public.recipe_comments(parent_id);

-- Enable RLS
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipe_comments ENABLE ROW LEVEL SECURITY;

-- Recipes RLS
CREATE POLICY "Anyone can view approved recipes"
  ON public.recipes FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Admins can view all recipes"
  ON public.recipes FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authors can view own recipes"
  ON public.recipes FOR SELECT TO authenticated
  USING (author_id = auth.uid());

CREATE POLICY "Authenticated users can submit recipes"
  ON public.recipes FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update own pending recipes"
  ON public.recipes FOR UPDATE TO authenticated
  USING (author_id = auth.uid() AND status = 'pending');

CREATE POLICY "Admins can manage all recipes"
  ON public.recipes FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authors can delete own pending recipes"
  ON public.recipes FOR DELETE TO authenticated
  USING (author_id = auth.uid() AND status = 'pending');

-- Comments RLS
CREATE POLICY "Anyone can view comments"
  ON public.recipe_comments FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON public.recipe_comments FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON public.recipe_comments FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON public.recipe_comments FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all comments"
  ON public.recipe_comments FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Triggers for updated_at
CREATE TRIGGER update_recipes_updated_at
  BEFORE UPDATE ON public.recipes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_recipe_comments_updated_at
  BEFORE UPDATE ON public.recipe_comments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();