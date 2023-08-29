import { IClientMessage, IRoom } from "../interfaces/interfaces";
import socket from "../utils/socketUtil";

const useChatActions = () => {
  const sendMessageToServer = (message: IClientMessage) => {
    socket.emit("sendMessage", message);
  };

  const joinRoom = (room: IRoom) => {
    socket.emit("joinRoom", room);
  };

  const leaveRoom = (room: IRoom) => {
    socket.emit("leaveRoom", room);
  };

  return {
    sendMessageToServer,
    joinRoom,
    leaveRoom,
  };
};

export default useChatActions;
