import { createContext, useContext } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_NESTJS_SERVER_URL);

const chatContext = createContext({ socket });

export const useChat = () => {
  return useContext(chatContext);
};

export const ChatProvider = ({ children }: any) => {
  const value = {
    socket,
  };
  return <chatContext.Provider value={value}>{children}</chatContext.Provider>;
};
