import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,

  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    registrationSuccess: (state, action) => {
      state.currentUser = action.payload;
    },

    registrationFailure: (state) => {
      state.error = true;
    },

  },
});

export const { 
  loginStart,
  loginSuccess,
  loginFailure,
  registrationSuccess,
  registrationFailure, } = userSlice.actions;
export default userSlice.reducer;
