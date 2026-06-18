import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { User } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface AuthContextType {
  currentUser: any | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, metadata?: any) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper to map Supabase user to standard user properties for compatibility
  const mapUser = (supabaseUser: User | null) => {
    if (!supabaseUser) return null;
    return {
      ...supabaseUser,
      displayName: supabaseUser.user_metadata?.name || supabaseUser.user_metadata?.full_name || '',
      email: supabaseUser.email,
      avatarUrl: supabaseUser.user_metadata?.avatar_url || '',
    };
  };

  // Sign In with Email & Password
  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  // Sign Up with Email & Password (with optional user metadata)
  const signUpWithEmail = async (email: string, password: string, metadata?: any) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata ? {
          name: metadata.name,
          phone: metadata.phone,
          city: metadata.city,
          user_type: metadata.userType,
          service_type: metadata.serviceType,
        } : undefined
      }
    });
    if (error) throw error;
  };

  // Sign In with Google
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      }
    });
    if (error) throw error;
  };

  // Sign Out
  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  // Send Password Reset Email
  const sendPasswordResetEmail = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  };

  // Update Password
  const updatePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({
      password,
    });
    if (error) throw error;
  };

  // Handle URL hash for password recovery errors/redirects on load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.replace('#', '?'));
      const error = params.get('error');
      const errorCode = params.get('error_code');
      const errorDescription = params.get('error_description');
      const type = params.get('type');

      if (error || errorCode) {
        if (errorCode === 'otp_expired' || errorDescription?.includes('expired') || errorDescription?.includes('invalid')) {
          // Clean the hash from the URL
          window.history.replaceState(null, '', window.location.pathname);
          // Show error toast
          setTimeout(() => {
            toast.error(
              errorDescription?.replace(/\+/g, ' ') || 
              'The password reset link is invalid or has expired. Please request a new one.'
            );
          }, 800);
        }
      } else if (type === 'recovery' || hash.includes('type=recovery')) {
        if (window.location.pathname !== '/reset-password') {
          window.location.pathname = '/reset-password';
        }
      }
    }
  }, []);

  // Listen to Auth State Changes
  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(mapUser(session?.user || null));
      setLoading(false);
    });

    // Listen to changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setCurrentUser(mapUser(session?.user || null));
      setLoading(false);

      if (event === 'PASSWORD_RECOVERY') {
        if (window.location.pathname !== '/reset-password') {
          window.location.pathname = '/reset-password';
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    logOut,
    sendPasswordResetEmail,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom Hook to consume Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

