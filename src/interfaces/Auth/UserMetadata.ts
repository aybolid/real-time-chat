import { UserMetadata } from '@supabase/supabase-js';

interface UserMeta extends UserMetadata {
  name: string;
}

export default UserMeta;
