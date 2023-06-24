import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../lib/supabase/auth/auth';
import { getCurrentUser } from '../lib/supabase/db/users';
import { useAppDispatch } from '../app/hooks';
import { setUserData } from '../app/features/currentUser/currentUserSlice';

export default function ProtectedRoute({
  redirectTo,
  children,
}: {
  redirectTo: string;
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  const {
    data: { session, user },
    isLoading,
  } = useAuth();

  React.useEffect(() => {
    if (!user) return;
    getCurrentUser(user.id).then(({ user }) => dispatch(setUserData(user)));
  }, [user, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Navigate to={redirectTo} />;
  }

  return children;
}
