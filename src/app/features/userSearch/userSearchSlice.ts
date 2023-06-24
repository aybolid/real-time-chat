import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import UserData from '../../../interfaces/Auth/UserData';
import { PostgrestError } from '@supabase/supabase-js';

interface UserSearchState {
  data: UserData[] | null;
  error: PostgrestError | null;
}

const initialState: UserSearchState = {
  data: null,
  error: null,
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
    },
  },
});

export const { setData, setError, clearData } = userSearchSlice.actions;
export const selectData = (state: RootState) => state.userSearch.data;
export const selectError = (state: RootState) => state.userSearch.error;

export default userSearchSlice.reducer;
