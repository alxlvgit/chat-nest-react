import { useChat } from "../context/ChatProvider";

const useChatActions = () => {
  const { socket } = useChat();

  const sendMessageToServer = (message: string) => {
    socket.emit("sendMessage", message);
  };

  return {
    sendMessageToServer,
  };
};

export default useChatActions;
