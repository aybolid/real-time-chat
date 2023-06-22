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
      <div className="grid grid-cols-3 items-center justify-center gap-6">
        <Avatar user={user as IUser} />
        <Button className="btn-lg btn-danger" onClick={signOut}>
          Sign Out
        </Button>
      </div>
    </SectionWrapper>
  );
}
