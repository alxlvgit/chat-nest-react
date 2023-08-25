import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILoginRequest, ISignUpRequest } from "../interfaces/interfaces";

export const authAPI = createApi({
  reducerPath: "authAPI",
  tagTypes: ["Post"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://server-nest-chat.onrender.com/auth/",
  }),
  endpoints: (build) => ({
    login: build.mutation<any, ILoginRequest>({
      query: ({ email, password }) => ({
        url: `login`,
        method: "POST",
        body: { email, password },
      }),
    }),
    signup: build.mutation<any, ISignUpRequest>({
      query: ({ email, password, firstName, lastName }) => ({
        url: `signup`,
        method: "POST",
        body: { email, password, firstName, lastName },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authAPI;
