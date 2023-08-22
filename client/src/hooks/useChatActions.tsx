import { useChat } from "../context/ChatProvider";

const useChatActions = () => {
  const { socket } = useChat();

  const sendMessageToServer = (message: string, sender: string) => {
    const messageObject = {
      content: message,
      senderName: sender,
    };
    socket.emit("sendMessage", messageObject);
  };

  return {
    sendMessageToServer,
  };
};

export default useChatActions;
