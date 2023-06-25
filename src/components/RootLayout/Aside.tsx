import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectUserData } from '../../app/features/currentUser/currentUserSlice';
import { useAuth } from '../../lib/supabase/auth/auth';
import { MdChat } from 'react-icons/md';

export default function Aside() {
  const {
    data: { session },
  } = useAuth();
  const data = useAppSelector(selectUserData);

  if (!session) return <></>;

  return (
    <aside className="w-full max-w-[80px] bg-sky-600 text-white">
      <nav>
        <NavLink
          to={'/'}
          className={({ isActive }) =>
            `nav-link ${isActive ? 'bg-sky-700' : ''}`
          }
        >
          <MdChat size={32} />
          <span className="text-white">Chat</span>
        </NavLink>
        <NavLink
          title={`${data?.name} Profile`}
          className={({ isActive }) =>
            `nav-link ${isActive ? 'bg-sky-700' : ''}`
          }
          to={'/user'}
        >
          <img
            src={data?.image}
            alt="Avatar"
            className="h-10 w-10 rounded-full"
          />
          <span>Profile</span>
        </NavLink>
      </nav>
    </aside>
  );
}
