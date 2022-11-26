import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const loginMock = async (value: string): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(value);
    }, 500);
  });
};

const logoutMock = async (): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

interface AuthState {
  authenticated: boolean;
  loading: boolean;
  username: string | null;
}

const initialState: AuthState = {
  authenticated: false,
  loading: false,
  username: null,
};

export const logIn = createAsyncThunk(
  'auth/login',
  async (username: string) => {
    const res = await loginMock(username);

    return res;
  },
);

export const logOut = createAsyncThunk('auth/logout', async () => {
  const res = await logoutMock();

  return res;
});

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
        state.username = payload;
      })
      .addCase(logOut.pending, state => {
        state.loading = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.loading = false;
        state.username = null;
        state.authenticated = false;
      });
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
