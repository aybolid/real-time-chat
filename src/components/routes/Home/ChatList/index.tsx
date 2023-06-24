import React from 'react';
import UserData from '../../../../interfaces/Auth/UserData';
import Search from './Search';
import { PostgrestError } from '@supabase/supabase-js';
import { useAppSelector } from '../../../../app/hooks';
import { selectUserSearch } from '../../../../app/features/userSearch/userSearchSlice';
import ReactLoading from 'react-loading';
import useRoveFocus from '../../../../hooks/useRoveFocus';

export interface SearchResults {
  res: UserData[] | null;
  error: PostgrestError | null;
}

export default function ChatList() {
  const {
    data: searchResults,
    error: searchError,
    isLoading: isLoadingSearch,
  } = useAppSelector(selectUserSearch);

  const { focus, setFocus } = useRoveFocus(searchResults?.length as number);

  return (
    <div className="rounded-md bg-sky-400 shadow-md">
      <Search />
      <ul className="flex w-full flex-col items-center justify-center gap-1 p-1">
        {isLoadingSearch && (
          <ReactLoading
            className="mt-4"
            type={'spokes'}
            color={'#fff'}
            height={'30px'}
            width={'30px'}
          />
        )}
        {searchResults?.length === 0 && !isLoadingSearch && (
          <p className="mt-2 rounded-md bg-amber-400 px-1">No results</p>
        )}
        {searchError ? (
          <p>{searchError.message}</p>
        ) : (
          searchResults?.map((user, idx) => (
            <SearchResultItem
              idx={idx}
              focus={focus === idx}
              setFocus={setFocus}
              key={user.user_id}
              user={user}
            />
          ))
        )}
      </ul>
    </div>
  );
}

const SearchResultItem = ({
  idx,
  user,
  focus,
  setFocus,
}: {
  idx: number;
  user: UserData;
  setFocus: React.Dispatch<React.SetStateAction<number>>;
  focus: boolean;
}) => {
  const ref = React.useRef<HTMLLIElement>(null);

  React.useEffect(() => {
    if (focus) {
      ref.current?.focus();
    }
  }, [focus]);

  const handleSelect = React.useCallback(() => {
    setFocus(idx);
  }, [idx, setFocus]);

  return (
    <li
      onClick={handleSelect}
      onKeyDown={handleSelect}
      ref={ref}
      role="button"
      tabIndex={focus ? 0 : -1}
      className="flex w-full items-center justify-between bg-white/30 p-4 duration-150 ease-in-out hover:bg-white/50 focus:bg-white/60 focus:outline-none"
    >
      <div className="flex items-center justify-center gap-3">
        <img src="/avatar-placeholder.svg" alt="Avatar" />
        <div>
          <p className="text-lg font-semibold">{user.name}</p>
          <p className="text-sm">{user.email}</p>
        </div>
      </div>
    </li>
  );
};
