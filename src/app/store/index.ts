import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { useDispatch } from 'react-redux';
import { authReducer } from './auth/auth-slice';
import { factsApi } from './facts/facts.query';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [factsApi.reducerPath]: factsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(factsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
