import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IRoom,
  IStoredMessage,
  IStoredRoom,
  IUser,
} from "../../interfaces/interfaces";

type ChatState = {
  messages: IStoredMessage[];
  rooms: IStoredRoom[];
  currentRoom: IRoom | undefined;
  roomMembers: IUser[];
  hideRooms: boolean;
};

const initialState: ChatState = {
  messages: [],
  rooms: [],
  currentRoom: undefined,
  roomMembers: [],
  hideRooms: true,
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
    updateRooms: (state, action: PayloadAction<IStoredRoom>) => {
      const roomIndex = state.rooms.findIndex(
        (room) => room.id === action.payload.id
      );
      state.rooms[roomIndex] = action.payload;
    },
    setCurrentRoom: (state, action: PayloadAction<IRoom | undefined>) => {
      state.currentRoom = action.payload;
    },
    setRoomMembers: (state, action: PayloadAction<IUser[]>) => {
      state.roomMembers = action.payload;
    },
    setHideRooms: (state, action: PayloadAction<boolean>) => {
      state.hideRooms = action.payload;
    },
    resetChatState: () => initialState,
    resetRoomState: (state) => {
      state.messages = [];
      state.currentRoom = undefined;
      state.roomMembers = [];
    },
  },
});

export const {
  addMessage,
  setRooms,
  setCurrentRoom,
  setStoredMessages,
  setRoomMembers,
  resetChatState,
  updateRooms,
  setHideRooms,
  resetRoomState,
} = chatSlice.actions;

export default chatSlice.reducer;
