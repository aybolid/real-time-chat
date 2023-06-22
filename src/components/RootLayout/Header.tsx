import { NavLink } from 'react-router-dom';
import { useAuth } from '../../lib/supabase/auth';

export default function Header() {
  const {
    data: { session },
  } = useAuth();

  return (
    <header className="w-full">
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        <NavLink to={'/'} className="text-4xl font-semibold ">
          Real Time Chat
        </NavLink>
        {session && (
          <nav>
            <NavLink className={'text-xl'} to={'/user'}>
              Account
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}
