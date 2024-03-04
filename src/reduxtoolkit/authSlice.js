import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    signin: false,
    currentUser: {},
  },
  reducers: {
    signIn: (state, action) => {
      state.signin = true;
    },
    signUp: (state, action) => {
      console.log("sign up ", action.payload);
    },
    currentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    signout: (state, action) => {
      state.signin = false;
      state.currentUser = {};
      localStorage.removeItem("token");
    },
  },
});

export const { signIn, signUp, currentUser, signout } = authSlice.actions;
export default authSlice.reducer;
