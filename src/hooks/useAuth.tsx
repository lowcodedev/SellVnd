import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/types/profile';

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (params: SignUpParams) => Promise<{ error: string | null }>;
  signIn: (params: SignInParams) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

interface SignUpParams {
  email: string;
  password: string;
  businessName: string;
  fullName: string;
}

interface SignInParams {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function friendlyAuthError(message: string): string {
  if (message.includes('Invalid login credentials')) return 'Incorrect email or password.';
  if (message.includes('User already registered')) return 'An account with this email already exists.';
  if (message.includes('Password should be at least')) return 'Password must be at least 6 characters.';
  if (message.includes('Unable to validate email address')) return 'Please enter a valid email address.';
  return message;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) {
        supabase
          .from('profiles')
          .select('id, business_name, full_name, created_at')
          .eq('id', data.session.user.id)
          .maybeSingle()
          .then(({ data: profileData }) => {
            setProfile(profileData as Profile | null);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (!newSession) {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!session) return;
    const { data } = await supabase
      .from('profiles')
      .select('id, business_name, full_name, created_at')
      .eq('id', session.user.id)
      .maybeSingle();
    setProfile(data as Profile | null);
  }, [session]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      session,
      profile,
      loading,
      signUp: async ({ email, password, businessName, fullName }) => {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { business_name: businessName, full_name: fullName } },
        });
        if (error) return { error: friendlyAuthError(error.message) };
        setSession(data.session);
        setProfile(
          data.session
            ? {
                id: data.session.user.id,
                business_name: businessName,
                full_name: fullName,
                created_at: new Date().toISOString(),
              }
            : null,
        );
        return { error: null };
      },
      signIn: async ({ email, password }) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { error: friendlyAuthError(error.message) };
        setSession(data.session);
        const { data: profileData } = await supabase
          .from('profiles')
          .select('id, business_name, full_name, created_at')
          .eq('id', data.session.user.id)
          .maybeSingle();
        setProfile(profileData as Profile | null);
        return { error: null };
      },
      signOut: async () => {
        await supabase.auth.signOut();
        setSession(null);
        setProfile(null);
      },
      refreshProfile,
    }),
    [session, profile, loading, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
