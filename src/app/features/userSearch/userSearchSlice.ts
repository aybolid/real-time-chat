import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import UserData from '../../../interfaces/Auth/UserData';
import { PostgrestError } from '@supabase/supabase-js';

interface UserSearchState {
  data: UserData[] | null;
  error: PostgrestError | null;
  isLoading: boolean;
}

const initialState: UserSearchState = {
  data: null,
  error: null,
  isLoading: false,
};

const userSearchSlice = createSlice({
  name: 'userSearch',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<UserData[] | null>) => {
      state.data = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setError: (state, action: PayloadAction<PostgrestError | null>) => {
      state.error = action.payload;
    },
    clearData: (state) => {
      state.data = null;
      state.error = null;
      state.isLoading = false;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setData, setError, clearData, setIsLoading } =
  userSearchSlice.actions;
  
export const selectUserSearch = (state: RootState) => state.userSearch;
export const selectData = (state: RootState) => state.userSearch.data;
export const selectError = (state: RootState) => state.userSearch.error;
export const selectIsLoading = (state: RootState) => state.userSearch.isLoading;

export default userSearchSlice.reducer;
