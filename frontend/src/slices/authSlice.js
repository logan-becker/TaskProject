import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  // token: localStorage.getItem('accessToken') || null,
  // isAuthenticated: !!localStorage.getItem('accessToken'),
  // error: null,

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

      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('accessToken', action.payload.token);

    },
    loginFailure: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.error = action.payload.error;

      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');

    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;

      // Clear localStorage to avoid the user being logged back in immediately
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');

    },
  },
});

// Export actions
export const { loginSuccess, loginFailure, logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
