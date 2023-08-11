import { useEffect, useState } from "react";
import { useChat } from "../context/ChatProvider";

interface IMessage {
  content: string;
  senderId: string;
  id: string;
}

const useMessages = () => {
  const { socket } = useChat();
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    socket.on("message", (message: IMessage) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  return messages;
};

export default useMessages;
