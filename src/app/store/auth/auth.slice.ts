import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser, UserCredentials } from 'app/shared/types';
import { AuthResponseModel, UserModel } from 'app/shared/models';
import { logoutMock, saveUserDataMock } from '../mocks';
import axios, { AxiosResponse } from 'axios';

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
    name: '',
    email: '',
    subscribed: false,
    userImage: '',
    id: '',
    createdAt: '',
    updatedAt: '',
  },
};

export const logIn = createAsyncThunk<
  AuthResponseModel<UserModel>,
  UserCredentials
>('auth/login', async user => {
  const res = await axios.post<
    UserCredentials,
    AxiosResponse<AuthResponseModel<UserModel>>
  >(
    'http://localhost:3000/api/users/login',
    { ...user },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  );
  return res.data;
});

export const logOut = createAsyncThunk('auth/logout', async () => {
  const res = await logoutMock();

  return res;
});

export const saveUserInfo = createAsyncThunk(
  'auth/saveInfo',
  async (data: IUser) => {
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
      .addCase(logIn.fulfilled, (state, { payload: { user } }) => {
        state.loading = false;
        state.authenticated = true;
        state.user = user;
      })
      .addCase(logOut.pending, state => {
        state.loading = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.loading = false;
        state.user = null;
        state.authenticated = false;
      });
    // .addCase(saveUserInfo.pending, state => {
    //   state.loading = true;
    // })
    // .addCase(saveUserInfo.fulfilled, (state, { payload }) => {
    //   state.loading = false;
    //   state.user = payload;
    // });
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
