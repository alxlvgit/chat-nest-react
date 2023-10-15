import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILoginRequest, ISignUpRequest } from "../interfaces/interfaces";

export const authAPI = createApi({
  reducerPath: "authAPI",
  tagTypes: ["Post"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_AUTH_API_URL || "http://localhost:3000/auth/",
  }),
  endpoints: (build) => ({
    login: build.mutation<any, ILoginRequest>({
      query: ({ email, password }) => ({
        url: `login`,
        method: "POST",
        body: { email, password },
        credentials: "include", // to set secure cookie
      }),
    }),
    signup: build.mutation<any, ISignUpRequest>({
      query: ({ email, password, firstName, lastName }) => ({
        url: `signup`,
        method: "POST",
        body: { email, password, firstName, lastName },
      }),
    }),
    logout: build.mutation<any, void>({
      query: () => ({
        url: `logout`,
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation } =
  authAPI;
