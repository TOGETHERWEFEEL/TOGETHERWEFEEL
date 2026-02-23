'use client';

import { useEffect, useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

type Props = {
  postId: string;
  userId: string;
  onUnlocked?: () => void; // unlock community notes after ME TOO
};

export default function MeTooButton({ postId, userId, onUnlocked }: Props) {
  const supabase = createSupabaseBrowserClient();;

  const [loading, setLoading] = useState(false);
  const [hasMeToo, setHasMeToo] = useState(false);

  // Check on load if user already "ME TOO"’d this post
  useEffect(() => {
    let cancelled = false;

    async function checkExisting() {
      if (!postId || !userId) return;

      const { data, error } = await supabase
        .from('me_too')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', userId)
        .maybeSingle();

      if (!cancelled) {
        if (!error && data) {
          setHasMeToo(true);
          onUnlocked?.();
        }
      }
    }

    checkExisting();
    return () => {
      cancelled = true;
    };
  }, [postId, userId, onUnlocked, supabase]);

  const handleMeToo = async () => {
    if (loading || hasMeToo) return;
    if (!postId || !userId) return;

    setLoading(true);

    // 1) Check first
    const { data: existing } = await supabase
      .from('me_too')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .maybeSingle();

    if (existing) {
      setHasMeToo(true);
      onUnlocked?.();
      setLoading(false);
      return;
    }

    // 2) Insert if not existing
    const { error } = await supabase.from('me_too').insert({
      post_id: postId,
      user_id: userId,
    });

    // If DB is still using (post_id,user_id) as PRIMARY KEY, duplicate inserts will throw.
    // This code prevents most duplicates, but the SQL fix is the real protection.
    if (!error) {
      setHasMeToo(true);
      onUnlocked?.();
    } else {
      // If you still see duplicate key errors, you must run the SQL fix we talked about.
      console.error('ME TOO insert error:', error);
      alert(error.message);
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleMeToo}
      disabled={hasMeToo || loading}
      style={{
        padding: '8px 14px',
        borderRadius: '999px',
        border: '1px solid #333',
        background: hasMeToo ? '#1a1a1a' : '#0b0b0b',
        color: '#fff',
        cursor: hasMeToo ? 'default' : 'pointer',
        opacity: loading ? 0.6 : 1,
        fontSize: '13px',
      }}
    >
      {hasMeToo ? '✓ ME TOO' : loading ? '...' : 'ME TOO'}
    </button>
  );
}