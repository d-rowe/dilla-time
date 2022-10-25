import { configureStore } from '@reduxjs/toolkit';
import beatReducer from '../slices/beatSlice';

export const store = configureStore({
  reducer: {
    beat: beatReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
