import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/interfaces";

type AuthState = {
  user: IUser | null;
  authenticated: boolean;
  token: string | null;
};

const initialState: AuthState = {
  user: null,
  authenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (
      state,
      action: PayloadAction<{ user: IUser; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.authenticated = true;
    },
    setLoggedOut: (state) => {
      state.user = null;
      state.token = null;
      state.authenticated = false;
    },
  },
});

export const { setLoggedIn, setLoggedOut } = authSlice.actions;

export default authSlice.reducer;
