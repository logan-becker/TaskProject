import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.error = action.payload.error;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
    },
  },
});

// Export the actions
export const { loginSuccess, loginFailure, logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
