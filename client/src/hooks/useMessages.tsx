import { useEffect, useState } from "react";
import { IStoredMessage } from "../interfaces/interfaces";
import socket from "../utils/socketUtil";

const useMessages = () => {
  const [messages, setMessages] = useState<IStoredMessage[]>([]);

  // Listen for new messages and all messages on initial load
  useEffect(() => {
    socket.on("message", (message: IStoredMessage) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("allMessages", (allMessages: IStoredMessage[]) => {
      setMessages(allMessages);
    });

    return () => {
      socket.off("message");
      socket.off("allMessages");
    };
  }, [socket]);

  return messages;
};

export default useMessages;
