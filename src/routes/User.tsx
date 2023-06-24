import Avatar from '../components/routes/User/Avatar';
import Button from '../components/elements/Button';
import SectionWrapper from '../components/elements/SectionWrapper';
import { useAuth } from '../lib/supabase/auth/auth';

export default function User() {
  const { signOut } = useAuth();

  return (
    <SectionWrapper>
      <div className="grid grid-cols-3 grid-rows-2 items-center justify-center gap-x-6">
        <Avatar />
      </div>
      <Button className="btn-lg btn-danger" onClick={signOut}>
        Sign Out
      </Button>
    </SectionWrapper>
  );
}
