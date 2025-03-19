import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Get initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setLoading(false);
      }).catch(() => {
        // If Supabase fails, just set loading to false
        setLoading(false);
      });

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } catch (error) {
      // If Supabase is not configured, just set loading to false
      setLoading(false);
    }
  }, []);

  return {
    session,
    loading,
  };
}