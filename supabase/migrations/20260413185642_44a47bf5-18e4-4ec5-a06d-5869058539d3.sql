
-- Loyalty points table
CREATE TABLE public.loyalty_points (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  points INTEGER NOT NULL,
  transaction_type TEXT NOT NULL DEFAULT 'earned',
  description TEXT,
  order_id UUID REFERENCES public.orders(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.loyalty_points ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own points" ON public.loyalty_points
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own points" ON public.loyalty_points
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage all points" ON public.loyalty_points
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Index for fast user lookups
CREATE INDEX idx_loyalty_points_user ON public.loyalty_points(user_id);

-- Function to get user total points
CREATE OR REPLACE FUNCTION public.get_user_loyalty_points(_user_id UUID)
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(SUM(points), 0)::INTEGER
  FROM public.loyalty_points
  WHERE user_id = _user_id
$$;
