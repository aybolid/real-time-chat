import { NavLink } from 'react-router-dom';
import { useAuth } from '../../lib/supabase/auth';
import logo from '../../assets/logo.svg';
import UserMeta from '../../interfaces/Auth/UserMetadata';
import getAvatarPlaceholder from '../../utils/getAvatarPlaceholder';

export default function Header() {
  const {
    data: { session, user },
  } = useAuth();

  return (
    <header className="w-full">
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <NavLink
          to={'/'}
          className="glass flex items-center justify-center gap-2 rounded-md bg-white px-2 text-4xl font-semibold shadow-md"
        >
          <img className="h-16 w-16" src={logo} alt="logo" />
          <span className="mb-2">real-time-chat</span>
        </NavLink>
        {session && (
          <nav>
            <NavLink
              className={
                'glass flex flex-nowrap items-center justify-center gap-2 rounded-md bg-white p-2 text-xl shadow-md'
              }
              to={'/user'}
            >
              <img
                src={getAvatarPlaceholder(
                  (user?.user_metadata as UserMeta).name
                )}
                alt="Avatar"
                className="h-10 w-10 rounded-full"
              />
              {(user?.user_metadata as UserMeta).name}
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}
