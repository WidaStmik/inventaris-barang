import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  auth: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export const { setUser, setAuth } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectAuth = (state) => state.user.auth;
export default userSlice.reducer;
