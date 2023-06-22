import Avatar from '../components/User/Avatar';
import Button from '../components/elements/Button';
import SectionWrapper from '../components/elements/SectionWrapper';
import { useAuth } from '../lib/supabase/auth';
import { User as IUser } from '@supabase/supabase-js';

export default function User() {
  const {
    data: { user },
    signOut,
  } = useAuth();

  return (
    <SectionWrapper>
      <div className="grid grid-cols-3 grid-rows-3 items-center justify-center gap-x-6">
        <Avatar user={user as IUser} />
        <div className="glass row-span-2 w-full rounded-md bg-white p-4 shadow-md">
          <h3 className="mb-4 text-xl font-semibold">About me</h3>
          <form className="h-full w-full">
            <textarea className="h-full w-full" />
          </form>
        </div>
      </div>
      <Button className="btn-lg btn-danger" onClick={signOut}>
        Sign Out
      </Button>
    </SectionWrapper>
  );
}
