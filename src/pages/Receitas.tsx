import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Clock, Users, ChefHat, ArrowRight, Search, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import Header from '@/components/Header';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import SEOHead from '@/components/SEOHead';
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

const DEFAULT_TIME_MAX = 240;
const DEFAULT_CAL_MAX = 1500;
const PAGE_SIZE = 9;

const Receitas = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState<string>('all');
  const [maxTime, setMaxTime] = useState<number>(DEFAULT_TIME_MAX);
  const [maxCalories, setMaxCalories] = useState<number>(DEFAULT_CAL_MAX);

  useEffect(() => {
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

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return recipes.filter((r) => {
      const totalTime = (r.prep_time || 0) + (r.cook_time || 0);
      if (difficulty !== 'all' && r.difficulty !== difficulty) return false;
      if (totalTime > maxTime) return false;
      if (maxCalories < DEFAULT_CAL_MAX && (r.calories ?? 0) > maxCalories) return false;
      if (term) {
        const haystack = `${r.title} ${r.description ?? ''}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      return true;
    });
  }, [recipes, search, difficulty, maxTime, maxCalories]);

  const hasActiveFilters =
    search.trim() !== '' ||
    difficulty !== 'all' ||
    maxTime !== DEFAULT_TIME_MAX ||
    maxCalories !== DEFAULT_CAL_MAX;

  const clearFilters = () => {
    setSearch('');
    setDifficulty('all');
    setMaxTime(DEFAULT_TIME_MAX);
    setMaxCalories(DEFAULT_CAL_MAX);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Receitas"
        description="Explore receitas autênticas de diversas culinárias do mundo com passo a passo detalhado e informações nutricionais."
        path="/receitas"
      />
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

          {/* Filtros */}
          <Card className="border-border/50 bg-card/50 backdrop-blur mb-8">
            <CardContent className="p-5 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar por nome ou descrição..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                    aria-label="Buscar receitas"
                  />
                </div>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger aria-label="Filtrar por dificuldade">
                    <SelectValue placeholder="Dificuldade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as dificuldades</SelectItem>
                    <SelectItem value="easy">Fácil</SelectItem>
                    <SelectItem value="medium">Médio</SelectItem>
                    <SelectItem value="hard">Difícil</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <label className="font-medium text-foreground">Tempo total máximo</label>
                    <span className="text-muted-foreground">
                      {maxTime >= DEFAULT_TIME_MAX ? 'Qualquer' : `até ${maxTime} min`}
                    </span>
                  </div>
                  <Slider
                    value={[maxTime]}
                    min={15}
                    max={DEFAULT_TIME_MAX}
                    step={15}
                    onValueChange={(v) => setMaxTime(v[0])}
                    aria-label="Tempo total máximo em minutos"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <label className="font-medium text-foreground">Calorias máximas</label>
                    <span className="text-muted-foreground">
                      {maxCalories >= DEFAULT_CAL_MAX ? 'Qualquer' : `até ${maxCalories} kcal`}
                    </span>
                  </div>
                  <Slider
                    value={[maxCalories]}
                    min={100}
                    max={DEFAULT_CAL_MAX}
                    step={50}
                    onValueChange={(v) => setMaxCalories(v[0])}
                    aria-label="Calorias máximas"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <p className="text-sm text-muted-foreground">
                  {loading
                    ? 'Carregando...'
                    : `${filtered.length} ${filtered.length === 1 ? 'receita encontrada' : 'receitas encontradas'}`}
                </p>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-4 w-4" />
                    Limpar filtros
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

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
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-playfair text-foreground mb-2">Nenhuma receita corresponde aos filtros</h2>
              <p className="text-muted-foreground mb-4">Tente ajustar a busca ou limpar os filtros aplicados.</p>
              <Button variant="outline" onClick={clearFilters}>
                Limpar filtros
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((recipe) => (
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
