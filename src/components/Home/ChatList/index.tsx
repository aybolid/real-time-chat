import UserData from '../../../interfaces/Auth/UserData';
import Search from './Search';
import { PostgrestError } from '@supabase/supabase-js';
import { useAppSelector } from '../../../app/hooks';
import {
  selectData,
  selectError,
} from '../../../app/features/userSearch/userSearchSlice';

export interface SearchResults {
  res: UserData[] | null;
  error: PostgrestError | null;
}

export default function ChatList() {
  const searchResults = useAppSelector(selectData);
  const searchError = useAppSelector(selectError);

  return (
    <div className="rounded-md bg-sky-400 shadow-md">
      <Search />
      <ul className="flex w-full flex-col items-center justify-center gap-1">
        {searchResults?.length === 0 && (
          <p className="mt-2 rounded-md bg-amber-400 px-1">No results</p>
        )}
        {searchError ? (
          <p>{searchError.message}</p>
        ) : (
          searchResults?.map((user) => (
            <li
              className="flex w-full items-center justify-between bg-white/30 p-4 hover:bg-white/50"
              key={user.user_id}
            >
              <div className="flex items-center justify-center gap-3">
                <img src="/avatar-placeholder.svg" alt="Avatar" />
                <div>
                  <p className="text-lg font-semibold">{user.name}</p>
                  <p className="text-sm">{user.email}</p>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
