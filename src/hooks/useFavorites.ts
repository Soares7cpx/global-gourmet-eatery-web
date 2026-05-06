import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export const useFavorites = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!user) {
      setFavorites(new Set());
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from('recipe_favorites')
      .select('recipe_id')
      .eq('user_id', user.id);
    if (!error && data) {
      setFavorites(new Set(data.map((r) => r.recipe_id)));
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  const isFavorite = (recipeId: string) => favorites.has(recipeId);

  const toggleFavorite = async (recipeId: string) => {
    if (!user) {
      toast({
        title: 'Faça login',
        description: 'Você precisa estar logado para favoritar receitas.',
        variant: 'destructive',
      });
      return;
    }
    const already = favorites.has(recipeId);
    // Optimistic update
    setFavorites((prev) => {
      const next = new Set(prev);
      if (already) next.delete(recipeId);
      else next.add(recipeId);
      return next;
    });

    if (already) {
      const { error } = await supabase
        .from('recipe_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('recipe_id', recipeId);
      if (error) {
        setFavorites((prev) => new Set(prev).add(recipeId));
        toast({ title: 'Erro', description: 'Não foi possível remover dos favoritos.', variant: 'destructive' });
      }
    } else {
      const { error } = await supabase
        .from('recipe_favorites')
        .insert({ user_id: user.id, recipe_id: recipeId });
      if (error) {
        setFavorites((prev) => {
          const next = new Set(prev);
          next.delete(recipeId);
          return next;
        });
        toast({ title: 'Erro', description: 'Não foi possível favoritar.', variant: 'destructive' });
      }
    }
  };

  return { favorites, isFavorite, toggleFavorite, loading, reload: load };
};
