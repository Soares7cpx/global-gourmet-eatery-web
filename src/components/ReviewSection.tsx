import { useState, useEffect } from 'react';
import { Star, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  user_id: string;
  user_name?: string;
}

interface ReviewSectionProps {
  menuItemId: string;
  menuItemName: string;
}

export default function ReviewSection({ menuItemId, menuItemName }: ReviewSectionProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [userReview, setUserReview] = useState<Review | null>(null);

  useEffect(() => { fetchReviews(); }, [menuItemId]);

  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('menu_item_id', menuItemId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      // Fetch user names
      const userIds = [...new Set(data.map(r => r.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', userIds);
      
      const enriched = data.map(r => ({
        ...r,
        user_name: profiles?.find(p => p.id === r.user_id)?.full_name || 'Anônimo'
      }));
      setReviews(enriched);
      if (user) {
        const ur = enriched.find(r => r.user_id === user.id);
        if (ur) { setUserReview(ur); setRating(ur.rating); setComment(ur.comment || ''); }
      }
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!user) { toast.error('Faça login para avaliar'); return; }
    if (rating === 0) { toast.error('Selecione uma nota'); return; }
    setSubmitting(true);

    if (userReview) {
      const { error } = await supabase.from('reviews')
        .update({ rating, comment: comment.trim() || null })
        .eq('id', userReview.id);
      if (error) toast.error('Erro ao atualizar'); else toast.success('Avaliação atualizada!');
    } else {
      const { error } = await supabase.from('reviews')
        .insert({ menu_item_id: menuItemId, user_id: user.id, rating, comment: comment.trim() || null });
      if (error) toast.error('Erro ao avaliar'); else toast.success('Avaliação enviada!');
    }
    setSubmitting(false);
    fetchReviews();
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="space-y-4">
      {/* Average */}
      {avgRating && (
        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className={`h-4 w-4 ${i <= Math.round(Number(avgRating)) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
            ))}
          </div>
          <span className="text-sm font-medium">{avgRating}</span>
          <span className="text-sm text-muted-foreground">({reviews.length} avaliações)</span>
        </div>
      )}

      {/* Write review */}
      {user && (
        <div className="border border-border/50 rounded-lg p-4 space-y-3">
          <p className="text-sm font-medium">{userReview ? 'Editar sua avaliação' : 'Avaliar este prato'}</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => (
              <button
                key={i}
                onMouseEnter={() => setHoverRating(i)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(i)}
                className="p-0.5"
              >
                <Star className={`h-6 w-6 transition-colors ${
                  i <= (hoverRating || rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                }`} />
              </button>
            ))}
          </div>
          <Textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Comentário opcional..."
            rows={2}
          />
          <Button size="sm" onClick={handleSubmit} disabled={submitting}>
            {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
            {userReview ? 'Atualizar' : 'Enviar'}
          </Button>
        </div>
      )}

      {/* Reviews list */}
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhuma avaliação ainda</p>
      ) : (
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {reviews.map(r => (
            <div key={r.id} className="border-b border-border/30 pb-2">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className={`h-3 w-3 ${i <= r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                  ))}
                </div>
                <span className="text-xs font-medium">{r.user_name}</span>
                <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString('pt-BR')}</span>
              </div>
              {r.comment && <p className="text-sm text-muted-foreground mt-1">{r.comment}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
