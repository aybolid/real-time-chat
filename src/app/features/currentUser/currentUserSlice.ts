import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import UserData from '../../../interfaces/Auth/UserData';

interface CurrentUserState {
  data: UserData | undefined;
}

const initialState: CurrentUserState = {
  data: undefined,
};

const CurrentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.data = action.payload;
    },
  },
});

export const { setUserData } = CurrentUserSlice.actions;
export const selectUserData = (state: RootState) =>
  state.currentUser.data as CurrentUserState['data'];

export default CurrentUserSlice.reducer;
