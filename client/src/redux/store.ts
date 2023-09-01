import { configureStore } from "@reduxjs/toolkit";
import { authAPI } from "../services/auth.service";
import { chatAPI } from "../services/chat.service";
import chatSlice from "./features/chatSlice";
import authSlice from "./features/authSlice";

export const store = configureStore({
  reducer: {
    [authAPI.reducerPath]: authAPI.reducer,
    [chatAPI.reducerPath]: chatAPI.reducer,
    chatSlice,
    authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware, chatAPI.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
