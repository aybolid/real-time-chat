import { User } from '@supabase/supabase-js';
import sb from '..';

export const uploadUserAvatar = async (file: File, userId: string) => {
  const { data, error } = await sb.storage.from('avatars').upload(userId, file);
  return { data, error };
};

export const getUserAvatarURL = (user: User) => {
  const {
    data: { publicUrl },
  } = sb.storage
    .from('avatars')
    .getPublicUrl(user.id, { transform: { width: 300, height: 300 } });

  return publicUrl;
};
