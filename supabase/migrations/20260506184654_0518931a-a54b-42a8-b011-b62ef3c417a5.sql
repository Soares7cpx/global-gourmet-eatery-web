CREATE TABLE public.recipe_favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  recipe_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, recipe_id)
);

ALTER TABLE public.recipe_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites"
ON public.recipe_favorites FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can add own favorites"
ON public.recipe_favorites FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can remove own favorites"
ON public.recipe_favorites FOR DELETE
TO authenticated
USING (user_id = auth.uid());

CREATE INDEX idx_recipe_favorites_user ON public.recipe_favorites(user_id);
CREATE INDEX idx_recipe_favorites_recipe ON public.recipe_favorites(recipe_id);