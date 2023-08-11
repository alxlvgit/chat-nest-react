import { createContext, useContext } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

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
