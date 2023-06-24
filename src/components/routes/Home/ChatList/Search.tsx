import React from 'react';
import LabeledInput from '../../../elements/LabeledInput';
import Button from '../../../elements/Button';
import { MdClose } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useDebouncedCallback } from 'use-debounce';
import {
  clearData,
  setData,
  setError,
  setIsLoading,
} from '../../../../app/features/userSearch/userSearchSlice';
import { searchForUsers } from '../../../../lib/supabase/db/users';
import { selectUserData } from '../../../../app/features/currentUser/currentUserSlice';

export default function Search() {
  const [query, setQuery] = React.useState('');
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUserData);

  const handleSearch = useDebouncedCallback(() => {
    if (!query) {
      dispatch(clearData());
      return;
    }
    if (query.length < 3) return;

    dispatch(setIsLoading(true));
    searchForUsers(query.trim(), currentUser?.user_id as string)
      .then(({ users, error }) => {
        dispatch(setData(users));
        dispatch(setError(error));
      })
      .finally(() => dispatch(setIsLoading(false)));
  }, 300);

  React.useEffect(() => {
    (async () => handleSearch())();
  }, [query, handleSearch]);

  return (
    <div className="relative">
      <LabeledInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for user"
        type="text"
        inputClassName="rounded-b-none pr-8"
      />
      {query && (
        <Button
          onClick={() => {
            setQuery('');
            dispatch(clearData());
          }}
          title="Clear"
          className="absolute right-1 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100"
        >
          <MdClose size={24} />
        </Button>
      )}
    </div>
  );
}
