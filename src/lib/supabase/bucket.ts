import sb from '.';

// type BucketName = 'avatars';

export const uploadUserAvatar = async (file: File, userId: string) => {
  const { data, error } = await sb.storage
    .from('avatars')
    .upload(userId, file);
  return { data, error };
};
