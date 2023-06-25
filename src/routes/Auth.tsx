import { NavLink, Navigate, useParams } from 'react-router-dom';
import SignUpForm from '../components/routes/Auth/SignUpForm';
import SectionWrapper from '../components/elements/SectionWrapper';
import { useAuth } from '../lib/supabase/auth/auth';
import SignInForm from '../components/routes/Auth/SignInForm';

export default function Auth() {
  const { type } = useParams<{ type: 'signup' | 'login' }>();

  const {
    data: { session },
    isLoading,
  } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!type || (type !== 'login' && type !== 'signup')) {
    return <Navigate to={'/not-found'} />;
  }

  if (session) {
    return <Navigate to={'/'} />;
  }

  return (
    <SectionWrapper>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <h2 className="mb-4 w-full text-center text-3xl font-semibold">
          {type === 'signup' ? 'Sign Up' : 'Log In'}
        </h2>

        {type === 'signup' ? <SignUpForm /> : <SignInForm />}

        <div className="mt-4 flex flex-col items-center justify-center">
          <p className="text-sm text-gray-500">
            {type === 'signup'
              ? 'Already have an account?'
              : 'Need an account?'}
          </p>
          <NavLink
            className={'hover:underline'}
            to={`/auth/${type === 'signup' ? 'login' : 'signup'}`}
          >
            {type === 'signup' ? 'Log In' : 'Sign Up'}
          </NavLink>
        </div>
      </div>
    </SectionWrapper>
  );
}
