import sb from '..';
import { SignUpData } from '../../../interfaces/Auth/AuthData';
import UserData from '../../../interfaces/Auth/UserData';

const tableName = 'users';

export const addNewUser = async (data: SignUpData, userId: string) => {
  const { error: dbError } = await sb.from(tableName).insert({
    user_id: userId,
    email: data.email,
    name: data.name,
  });
  if (dbError) throw new Error(dbError.message);
};

export const getCurrentUser = async (userId: string) => {
  const { data: user, error } = await sb
    .from(tableName)
    .select('*')
    .match({ user_id: userId });

  if (error) throw new Error(error.message);

  return { user: (user as UserData[])[0] };
};

export const searchForUsers = async (query: string, currentUserId: string) => {
  const { data: users, error } = await sb
    .from(tableName)
    .select('*')
    .not('user_id', 'eq', currentUserId)
    .or(`name.ilike.%${query}%,email.ilike.%${query}%`)
    .limit(10);

  return { users: users as UserData[] | null, error };
};
