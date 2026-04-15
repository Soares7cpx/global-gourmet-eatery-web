import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Clock, Users, ChefHat, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/Header';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import Footer from '@/components/Footer';

interface Recipe {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  prep_time: number;
  cook_time: number;
  servings: number;
  difficulty: string;
  image_url: string | null;
  calories: number | null;
}

const difficultyLabels: Record<string, string> = {
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil',
};

const difficultyColors: Record<string, string> = {
  easy: 'bg-green-500/20 text-green-400 border-green-500/30',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  hard: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const Receitas = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Receitas - Mundo Gastronômico';
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('id, title, slug, description, prep_time, cook_time, servings, difficulty, image_url, calories')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRecipes(data || []);
    } catch (err) {
      console.error('Error loading recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20">
        <PageBreadcrumb />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/30">
              <p className="text-sm font-medium text-primary">Receitas Exclusivas</p>
            </div>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gradient">
              Nossas Receitas
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore receitas autênticas de diversas culinárias do mundo, com passo a passo detalhado e informações nutricionais.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-80 rounded-lg" />
              ))}
            </div>
          ) : recipes.length === 0 ? (
            <div className="text-center py-20">
              <ChefHat className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-playfair text-foreground mb-2">Nenhuma receita disponível ainda</h2>
              <p className="text-muted-foreground">Em breve teremos receitas incríveis para você!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <Link key={recipe.id} to={`/receitas/${recipe.slug}`}>
                  <Card className="border-border/50 bg-card/50 backdrop-blur card-hover overflow-hidden group h-full">
                    {recipe.image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={recipe.image_url}
                          alt={recipe.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className={difficultyColors[recipe.difficulty] || difficultyColors.medium}>
                          {difficultyLabels[recipe.difficulty] || recipe.difficulty}
                        </Badge>
                        {recipe.calories && (
                          <span className="text-xs text-muted-foreground">{recipe.calories} kcal</span>
                        )}
                      </div>
                      <h3 className="font-playfair text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {recipe.title}
                      </h3>
                      {recipe.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{recipe.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {recipe.prep_time + recipe.cook_time} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          {recipe.servings} porções
                        </span>
                        <span className="ml-auto flex items-center gap-1 text-primary">
                          Ver receita <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Receitas;
