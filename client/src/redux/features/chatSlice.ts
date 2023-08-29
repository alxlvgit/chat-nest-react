import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoom, IStoredMessage } from "../../interfaces/interfaces";

const initialState = {
  messages: [] as IStoredMessage[],
  rooms: [] as IRoom[],
  currentRoom: undefined as IRoom | undefined,
  loading: false,
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
  },
});

export const { addMessage, setRooms, setCurrentRoom, setStoredMessages } =
  chatSlice.actions;

export default chatSlice.reducer;
