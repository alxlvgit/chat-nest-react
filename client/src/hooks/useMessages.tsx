import { useEffect } from "react";
import { IStoredMessage } from "../interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import socket from "../utils/socketUtil";
import {
  addMessage,
  setStoredMessages,
  setRoomMembers,
} from "../redux/features/chatSlice";

const useMessages = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.chatSlice.messages);

  // Listen for new messages and all messages on initial load
  useEffect(() => {
    socket.on("message", (message: IStoredMessage) => {
      dispatch(addMessage(message));
    });

    socket.on("roomData", (roomData) => {
      const { roomMessages, roomMembers } = roomData;
      dispatch(setStoredMessages(roomMessages));
      dispatch(setRoomMembers(roomMembers));
    });

    return () => {
      socket.off("message");
      socket.off("roomData");
    };
  }, [socket]);

  return messages;
};

export default useMessages;
