import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { useAppSelector } from '../../app/hooks';
import { selectUserData } from '../../app/features/currentUser/currentUserSlice';
import { useAuth } from '../../lib/supabase/auth/auth';

export default function Header() {
  const {
    data: { session },
  } = useAuth();
  const data = useAppSelector(selectUserData);

  return (
    <header className="w-full">
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <NavLink
          to={'/'}
          className="flex items-center justify-center gap-2 text-4xl font-semibold"
        >
          <img className="h-16 w-16" src={logo} alt="logo" />
          <span className="mb-2">real-time-chat</span>
        </NavLink>
        {session && (
          <nav>
            <NavLink
              title={`${data?.name} Profile`}
              className={
                'glass flex flex-nowrap items-center justify-center gap-2 rounded-md bg-white p-2 text-xl shadow-lg duration-150 ease-in-out hover:scale-105 active:scale-100'
              }
              to={'/user'}
            >
              <img
                src={data?.image}
                alt="Avatar"
                className="h-10 w-10 rounded-full"
              />
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}
