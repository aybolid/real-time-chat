import SectionWrapper from '../components/elements/SectionWrapper';
import UserMeta from '../interfaces/Auth/UserMetadata';
import { useAuth } from '../lib/supabase/auth';

export default function User() {
  const {
    data: { user },
    signOut,
  } = useAuth();

  const data = user?.user_metadata as UserMeta;

  return (
    <SectionWrapper>
      <h1>{data.name}</h1>
      <button onClick={signOut}>Log out</button>
    </SectionWrapper>
  );
}
