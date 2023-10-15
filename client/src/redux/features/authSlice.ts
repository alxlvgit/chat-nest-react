import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/interfaces";

type AuthState = {
  user: IUser | null;
  authenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  authenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedInUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.authenticated = true;
    },
    setLoggedOut: (state) => {
      state.user = null;
      state.authenticated = false;
    },
  },
});

export const { setLoggedInUser, setLoggedOut } = authSlice.actions;

export default authSlice.reducer;
