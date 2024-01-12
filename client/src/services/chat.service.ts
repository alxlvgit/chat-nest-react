import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ICreateRoomRequest,
  IDeleteRoomRequest,
  IUpdateRoomRequest,
} from "../interfaces/interfaces";

export const chatAPI = createApi({
  reducerPath: "chatAPI",
  tagTypes: ["Chat"],
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_CHAT_API_URL || "http://localhost:3000/chat/",
  }),
  endpoints: (build) => ({
    getRooms: build.query<any, any>({
      query: () => ({
        url: `rooms`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getRoom: build.query<any, string>({
      query: (id) => ({
        url: `room/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    createRoom: build.mutation<any, ICreateRoomRequest>({
      query: (roomData) => ({
        url: `room`,
        method: "POST",
        body: roomData,
        credentials: "include",
      }),
    }),
    deleteRoom: build.mutation<any, IDeleteRoomRequest>({
      query: (id) => ({
        url: `room/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    updateRoom: build.mutation<any, IUpdateRoomRequest>({
      query: ({ id, name }) => ({
        url: `room/${id}`,
        method: "PUT",
        body: { name },
        credentials: "include",
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
