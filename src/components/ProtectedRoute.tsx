import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../lib/supabase/auth';

export default function ProtectedRoute({
  redirectTo,
  children,
}: {
  redirectTo: string;
  children: React.ReactNode;
}) {
  const {
    data: { session },
    isLoading,
  } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!session) {
    return <Navigate to={redirectTo} />;
  }

  return children;
}
