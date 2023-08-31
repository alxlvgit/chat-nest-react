import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IRoom,
  IRoomParticipant,
  IStoredMessage,
} from "../../interfaces/interfaces";

type ChatState = {
  messages: IStoredMessage[];
  rooms: IRoom[];
  currentRoom: IRoom | undefined;
  loading: boolean;
  roomMembers: IRoomParticipant[];
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
    setRooms: (state, action: PayloadAction<IRoom[]>) => {
      state.rooms = action.payload;
    },
    setCurrentRoom: (state, action: PayloadAction<IRoom | undefined>) => {
      state.currentRoom = action.payload;
    },
    setRoomMembers: (state, action: PayloadAction<IRoomParticipant[]>) => {
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
