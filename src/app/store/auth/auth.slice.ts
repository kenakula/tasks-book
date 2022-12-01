import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserModel } from 'app/shared/types';
import { loginMock, logoutMock, saveUserDataMock } from '../mocks';

interface AuthState {
  authenticated: boolean;
  loading: boolean;
  error: boolean;
  user: UserModel | null;
}

const initialState: AuthState = {
  authenticated: false,
  loading: false,
  error: false,
  user: {
    name: 'kenan',
    email: 'sfdfs@fdfdf.ru',
    subscribed: false,
    userImage: '',
  },
};

export const logIn = createAsyncThunk('auth/login', async (user: UserModel) => {
  const res = await loginMock(user);

  return res;
});

export const logOut = createAsyncThunk('auth/logout', async () => {
  const res = await logoutMock();

  return res;
});

export const saveUserInfo = createAsyncThunk(
  'auth/saveInfo',
  async (data: UserModel) => {
    const res = await saveUserDataMock(data);

    return res;
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(logIn.pending, state => {
        state.loading = true;
      })
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.authenticated = true;
        state.user = payload;
      })
      .addCase(logOut.pending, state => {
        state.loading = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.loading = false;
        state.user = null;
        state.authenticated = false;
      })
      .addCase(saveUserInfo.pending, state => {
        state.loading = true;
      })
      .addCase(saveUserInfo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
      });
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
