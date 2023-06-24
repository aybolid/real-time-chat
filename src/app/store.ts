import { configureStore } from '@reduxjs/toolkit';

import currentUserReducer from './features/currentUser/currentUserSlice';
import userSearchReducer from './features/userSearch/userSearchSlice';

export const store = configureStore({
  reducer: { userSearch: userSearchReducer, currentUser: currentUserReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
