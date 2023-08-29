import { useEffect } from "react";
import { IStoredMessage } from "../interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import socket from "../utils/socketUtil";
import { addMessage, setStoredMessages } from "../redux/features/chatSlice";

const useMessages = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.chatSlice.messages);

  // Listen for new messages and all messages on initial load
  useEffect(() => {
    socket.on("message", (message: IStoredMessage) => {
      dispatch(addMessage(message));
    });

    socket.on("storedMessages", (allMessages: IStoredMessage[]) => {
      dispatch(setStoredMessages(allMessages));
    });

    return () => {
      socket.off("message");
      socket.off("storedMessages");
    };
  }, [socket]);

  return messages;
};

export default useMessages;
