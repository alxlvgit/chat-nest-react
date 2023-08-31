import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IStoredMessage,
  IStoredRoom,
  IUser,
} from "../../interfaces/interfaces";

type ChatState = {
  messages: IStoredMessage[];
  rooms: IStoredRoom[];
  currentRoom: IStoredRoom | undefined;
  loading: boolean;
  roomMembers: IUser[];
};

const initialState: ChatState = {
  messages: [],
  rooms: [],
  currentRoom: undefined,
  loading: false,
  roomMembers: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IStoredMessage>) => {
      state.messages.push(action.payload);
    },
    setStoredMessages: (state, action: PayloadAction<IStoredMessage[]>) => {
      state.messages = action.payload;
    },
    setRooms: (state, action: PayloadAction<IStoredRoom[]>) => {
      state.rooms = action.payload;
    },
    setCurrentRoom: (state, action: PayloadAction<IStoredRoom | undefined>) => {
      state.currentRoom = action.payload;
    },
    setRoomMembers: (state, action: PayloadAction<IUser[]>) => {
      state.roomMembers = action.payload;
    },
    resetChatState: () => initialState,
  },
});

export const {
  addMessage,
  setRooms,
  setCurrentRoom,
  setStoredMessages,
  setRoomMembers,
  resetChatState,
} = chatSlice.actions;

export default chatSlice.reducer;
