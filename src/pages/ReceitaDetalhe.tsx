import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Clock, Users, ChefHat, Flame, Loader2, ArrowLeft, MessageCircle, Send, Reply, Trash2, Share2, Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/Header';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import Footer from '@/components/Footer';

interface Recipe {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  ingredients: string[];
  steps: { title?: string; description: string }[];
  prep_time: number;
  cook_time: number;
  servings: number;
  difficulty: string;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  image_url: string | null;
  video_url: string | null;
  author_id: string;
  created_at: string;
}

interface Comment {
  id: string;
  content: string;
  user_id: string;
  parent_id: string | null;
  created_at: string;
  profile?: { full_name: string | null };
  replies?: Comment[];
}

const difficultyLabels: Record<string, string> = {
  easy: 'Fácil', medium: 'Médio', hard: 'Difícil',
};

const ReceitaDetalhe = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (slug) loadRecipe();
  }, [slug]);

  const loadRecipe = async () => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'approved')
        .single();

      if (error) throw error;
      setRecipe(data as unknown as Recipe);
      document.title = `${data.title} - Mundo Gastronômico`;
      loadComments(data.id);
    } catch {
      setRecipe(null);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async (recipeId: string) => {
    const { data } = await supabase
      .from('recipe_comments')
      .select('*')
      .eq('recipe_id', recipeId)
      .order('created_at', { ascending: true });

    if (data) {
      // Build threaded comments
      const topLevel: Comment[] = [];
      const byId: Record<string, Comment> = {};
      data.forEach((c: any) => { byId[c.id] = { ...c, replies: [] }; });
      data.forEach((c: any) => {
        if (c.parent_id && byId[c.parent_id]) {
          byId[c.parent_id].replies!.push(byId[c.id]);
        } else {
          topLevel.push(byId[c.id]);
        }
      });
      setComments(topLevel);
    }
  };

  const handleSubmitComment = async (parentId: string | null = null) => {
    if (!user) { toast.error('Faça login para comentar'); return; }
    const content = parentId ? replyContent : newComment;
    if (!content.trim()) return;

    setSubmitting(true);
    const { error } = await supabase.from('recipe_comments').insert({
      recipe_id: recipe!.id,
      user_id: user.id,
      parent_id: parentId,
      content: content.trim(),
    });
    setSubmitting(false);

    if (error) { toast.error('Erro ao enviar comentário'); return; }
    toast.success('Comentário enviado!');
    setNewComment('');
    setReplyContent('');
    setReplyTo(null);
    loadComments(recipe!.id);
  };

  const handleDeleteComment = async (commentId: string) => {
    const { error } = await supabase.from('recipe_comments').delete().eq('id', commentId);
    if (error) { toast.error('Erro ao excluir'); return; }
    toast.success('Comentário excluído');
    loadComments(recipe!.id);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: recipe!.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copiado!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 container mx-auto px-4 py-8 space-y-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 container mx-auto px-4 py-20 text-center">
          <ChefHat className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-playfair mb-4">Receita não encontrada</h1>
          <Link to="/receitas"><Button className="btn-gold">Ver todas as receitas</Button></Link>
        </div>
      </div>
    );
  }

  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
  const steps = Array.isArray(recipe.steps) ? recipe.steps : [];
  const totalTime = recipe.prep_time + recipe.cook_time;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20">
        <div className="container mx-auto px-4">
          <PageBreadcrumb />
        </div>

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Hero */}
          {recipe.image_url && (
            <div className="aspect-video rounded-xl overflow-hidden mb-8">
              <img src={recipe.image_url} alt={recipe.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge className="bg-primary/20 text-primary border-primary/30">
                {difficultyLabels[recipe.difficulty] || recipe.difficulty}
              </Badge>
              <Button variant="ghost" size="sm" onClick={handleShare} className="gap-2 text-muted-foreground">
                <Share2 className="h-4 w-4" /> Compartilhar
              </Button>
            </div>

            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-foreground">{recipe.title}</h1>
            {recipe.description && <p className="text-muted-foreground text-lg">{recipe.description}</p>}

            {/* Quick info */}
            <div className="flex flex-wrap gap-4 py-4 border-y border-border/50">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Preparo: {recipe.prep_time} min</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Flame className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Cozimento: {recipe.cook_time} min</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Total: {totalTime} min</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{recipe.servings} porções</span>
              </div>
            </div>
          </div>

          {/* Nutritional info */}
          {(recipe.calories || recipe.protein || recipe.carbs || recipe.fat) && (
            <Card className="border-border/50 bg-card/50 mb-8">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-playfair">Informações Nutricionais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {recipe.calories && (
                    <div className="text-center p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <div className="text-2xl font-bold text-primary">{recipe.calories}</div>
                      <div className="text-xs text-muted-foreground">Calorias</div>
                    </div>
                  )}
                  {recipe.protein && (
                    <div className="text-center p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <div className="text-2xl font-bold text-primary">{recipe.protein}g</div>
                      <div className="text-xs text-muted-foreground">Proteína</div>
                    </div>
                  )}
                  {recipe.carbs && (
                    <div className="text-center p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <div className="text-2xl font-bold text-primary">{recipe.carbs}g</div>
                      <div className="text-xs text-muted-foreground">Carboidratos</div>
                    </div>
                  )}
                  {recipe.fat && (
                    <div className="text-center p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <div className="text-2xl font-bold text-primary">{recipe.fat}g</div>
                      <div className="text-xs text-muted-foreground">Gordura</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Video */}
          {recipe.video_url && (
            <div className="mb-8">
              <h2 className="font-playfair text-2xl font-bold mb-4">Vídeo da Receita</h2>
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  src={recipe.video_url}
                  className="w-full h-full"
                  allowFullScreen
                  title={`Vídeo: ${recipe.title}`}
                  loading="lazy"
                />
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Ingredients */}
            <Card className="border-border/50 bg-card/50 md:col-span-1">
              <CardHeader>
                <CardTitle className="font-playfair text-xl">Ingredientes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {ingredients.map((ing: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      {ing}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Steps */}
            <Card className="border-border/50 bg-card/50 md:col-span-2">
              <CardHeader>
                <CardTitle className="font-playfair text-xl">Modo de Preparo</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-6">
                  {steps.map((step: any, i: number) => (
                    <li key={i} className="flex gap-4">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        {step.title && <h4 className="font-medium text-foreground mb-1">{step.title}</h4>}
                        <p className="text-sm text-muted-foreground">{typeof step === 'string' ? step : step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* Comments Section */}
          <section className="mb-12">
            <h2 className="font-playfair text-2xl font-bold mb-6 flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-primary" />
              Comentários
            </h2>

            {/* New comment form */}
            {user ? (
              <div className="flex gap-3 mb-8">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Compartilhe sua experiência com esta receita..."
                  className="flex-1 min-h-[80px] rounded-lg border border-input bg-background p-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                />
                <Button
                  onClick={() => handleSubmitComment(null)}
                  disabled={submitting || !newComment.trim()}
                  className="btn-gold self-end gap-2"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  Enviar
                </Button>
              </div>
            ) : (
              <Card className="border-border/50 bg-card/50 mb-8 p-6 text-center">
                <p className="text-muted-foreground mb-3">Faça login para comentar</p>
                <Link to="/auth"><Button variant="outline">Entrar</Button></Link>
              </Card>
            )}

            {/* Comments list */}
            {comments.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Seja o primeiro a comentar!</p>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    currentUserId={user?.id}
                    onReply={(id) => { setReplyTo(id); setReplyContent(''); }}
                    onDelete={handleDeleteComment}
                    replyTo={replyTo}
                    replyContent={replyContent}
                    onReplyContentChange={setReplyContent}
                    onSubmitReply={() => handleSubmitComment(replyTo)}
                    submitting={submitting}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

interface CommentItemProps {
  comment: Comment;
  currentUserId?: string;
  onReply: (id: string) => void;
  onDelete: (id: string) => void;
  replyTo: string | null;
  replyContent: string;
  onReplyContentChange: (v: string) => void;
  onSubmitReply: () => void;
  submitting: boolean;
  depth?: number;
}

const CommentItem = ({ comment, currentUserId, onReply, onDelete, replyTo, replyContent, onReplyContentChange, onSubmitReply, submitting, depth = 0 }: CommentItemProps) => (
  <div className={`${depth > 0 ? 'ml-8 border-l-2 border-primary/20 pl-4' : ''}`}>
    <div className="bg-card/30 rounded-lg p-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">
          {comment.profile?.full_name || 'Usuário'}
        </span>
        <span className="text-xs text-muted-foreground">
          {new Date(comment.created_at).toLocaleDateString('pt-BR')}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{comment.content}</p>
      <div className="flex gap-2">
        {currentUserId && (
          <button onClick={() => onReply(comment.id)} className="text-xs text-primary hover:underline flex items-center gap-1">
            <Reply className="h-3 w-3" /> Responder
          </button>
        )}
        {currentUserId === comment.user_id && (
          <button onClick={() => onDelete(comment.id)} className="text-xs text-destructive hover:underline flex items-center gap-1">
            <Trash2 className="h-3 w-3" /> Excluir
          </button>
        )}
      </div>
    </div>

    {replyTo === comment.id && (
      <div className="ml-8 mt-2 flex gap-2">
        <input
          value={replyContent}
          onChange={(e) => onReplyContentChange(e.target.value)}
          placeholder="Escreva uma resposta..."
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <Button size="sm" onClick={onSubmitReply} disabled={submitting || !replyContent.trim()} className="gap-1">
          {submitting ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
        </Button>
      </div>
    )}

    {comment.replies && comment.replies.length > 0 && (
      <div className="mt-2 space-y-2">
        {comment.replies.map((reply) => (
          <CommentItem
            key={reply.id}
            comment={reply}
            currentUserId={currentUserId}
            onReply={onReply}
            onDelete={onDelete}
            replyTo={replyTo}
            replyContent={replyContent}
            onReplyContentChange={onReplyContentChange}
            onSubmitReply={onSubmitReply}
            submitting={submitting}
            depth={depth + 1}
          />
        ))}
      </div>
    )}
  </div>
);

export default ReceitaDetalhe;
