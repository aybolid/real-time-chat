import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

import type { User, Session } from '@supabase/supabase-js';

export interface UserState {
  user: User | null;
  session: Session | null;
  authError: string | null;
}

const initialState: UserState = {
  user: null,
  session: null,
  authError: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: User; session: Session }>
    ) => {
      state.user = action.payload.user;
      state.session = action.payload.session;
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.authError = action.payload;
    },
    clearAuthError: (state) => {
      state.authError = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.session = null;
      state.authError = null;
    },
  },
});

export const selectUser = (state: RootState) => ({
  user: state.user.user,
  session: state.user.session,
});

export const { setUser, setAuthError, clearUser, clearAuthError } =
  userSlice.actions;
export default userSlice.reducer;
