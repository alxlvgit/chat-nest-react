import { useEffect } from "react";
import { IStoredMessage } from "../interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import socket from "../utils/socketUtil";
import {
  addMessage,
  setStoredMessages,
  setRoomMembers,
} from "../redux/features/chatSlice";

const useRoomData = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.chatSlice.messages);

  // Listen for new messages and all messages on initial load
  useEffect(() => {
    socket.on("messageFromServer", (message: IStoredMessage) => {
      dispatch(addMessage(message));
    });

    socket.on("roomData", (roomData) => {
      const { messages, participants } = roomData;
      dispatch(setStoredMessages(messages));
      dispatch(setRoomMembers(participants));
    });

    return () => {
      socket.off("messageFromServer");
      socket.off("roomData");
    };
  }, [socket]);

  return messages;
};

export default useRoomData;
