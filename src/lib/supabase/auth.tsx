import React from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import sb from '.';
import { SignInData, SignUpData } from '../../interfaces/Auth/AuthData';

export interface AuthState {
  signUp: (authData: SignUpData) => Promise<void>;
  signIn: (authData: SignInData) => Promise<void>;
  signOut: () => Promise<void>;
  data: {
    session: Session | null;
    user: User | null;
  };
  authError: AuthError | null;
  isLoading: boolean;
}

const authContext = React.createContext<AuthState | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const auth = React.useContext(authContext);
  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }
  return auth;
};

const useProvideAuth = () => {
  const [session, setSession] = React.useState<Session | null>(null);
  const [user, setUser] = React.useState<User | null>(null);
  const [authError, setAuthError] = React.useState<AuthError | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const {
        data: { session },
        error,
      } = await sb.auth.getSession();
      if (error) {
        setAuthError(error);
      } else {
        setSession(session ?? null);
      }
      setIsLoading(false);
    })();

    const {
      data: { subscription },
    } = sb.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (authData: SignUpData) => {
    const { error, data } = await sb.auth.signUp({
      email: authData.email,
      password: authData.password,
      options: {
        data: {
          name: authData.name,
        },
      },
    });
    if (error) {
      setAuthError(error);
      return;
    }
    setSession(data.session);
    setUser(data.user);
    setAuthError(null);
  };

  const signIn = async (authData: SignInData) => {
    const { error, data } = await sb.auth.signInWithPassword(authData);
    if (error) {
      setAuthError(error);
      return;
    }
    setSession(data.session);
    setUser(data.user);
    setAuthError(null);
  };

  const signOut = async () => {
    const { error } = await sb.auth.signOut();
    if (error) {
      setAuthError(error);
      return;
    }
    setSession(null);
    setUser(null);
    setAuthError(null);
  };

  return {
    data: { session, user },
    authError,
    isLoading,
    signUp,
    signIn,
    signOut,
  };
};
