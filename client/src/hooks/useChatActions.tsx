import { IClientMessage } from "../interfaces/interfaces";
import socket from "../utils/socketUtil";

const useChatActions = () => {
  const sendMessageToServer = (message: IClientMessage) => {
    socket.emit("sendMessage", message);
  };

  return {
    sendMessageToServer,
  };
};

export default useChatActions;
