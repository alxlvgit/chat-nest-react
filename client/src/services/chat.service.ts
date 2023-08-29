import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ICreateRoomRequest,
  IDeleteRoomRequest,
  IUpdateRoomRequest,
} from "../interfaces/interfaces";

export const chatAPI = createApi({
  reducerPath: "chatAPI",
  tagTypes: ["Chat"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://server-nest-chat.onrender.com/chat/",
    // baseUrl: "http://localhost:3000/chat/",
  }),
  endpoints: (build) => ({
    getRooms: build.query<any, any>({
      query: () => ({
        url: `rooms`,
        method: "GET",
      }),
    }),
    getRoom: build.query<any, string>({
      query: (id) => ({
        url: `room/${id}`,
        method: "GET",
      }),
    }),
    createRoom: build.mutation<any, ICreateRoomRequest>({
      query: (name) => ({
        url: `room`,
        method: "POST",
        body: { name },
      }),
    }),
    deleteRoom: build.mutation<any, IDeleteRoomRequest>({
      query: (id) => ({
        url: `room/${id}`,
        method: "DELETE",
      }),
    }),
    updateRoom: build.mutation<any, IUpdateRoomRequest>({
      query: ({ id, name }) => ({
        url: `room/${id}`,
        method: "PUT",
        body: { name },
      }),
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetRoomQuery,
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useUpdateRoomMutation,
} = chatAPI;
