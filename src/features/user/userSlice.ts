import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken, getUser } from '../../api/user';
import { User } from '../../types';

export const loginUserThunk = createAsyncThunk(
  'users/loginUser',
  async ({ login, password }: { login: string; password: string }) => {
    const token = await getToken({ login, password });
    localStorage.setItem('token', token);
    return token;
  }
);

export const getUserThunk = createAsyncThunk(
  'users/getUser',
  async ({ token }: { token: string }) => {
    const user = await getUser({ token });
    return user;
  }
);

export interface UserState {
  isInit: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

const initialState: UserState = {
  isInit: false,
  isLoading: false,
  user: null,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    init: (state) => {
      state.isInit = true;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(loginUserThunk.fulfilled, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserThunk.rejected, (state) => {
      state.isInit = true;
      state.isLoading = false;
    });
    builder.addCase(getUserThunk.fulfilled, (state, { payload }) => {
      state.isInit = true;
      state.isLoading = false;
      state.user = payload;
    });
  }
});

export const { init, logout } = userSlice.actions;

export default userSlice.reducer;
