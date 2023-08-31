import { IClientMessage, IRoom } from "../interfaces/interfaces";
import socket from "../utils/socketUtil";

const useChatActions = () => {
  const sendMessageToServer = (message: IClientMessage) => {
    socket.emit("messageFromClient", message);
  };

  const joinRoom = (room: IRoom) => {
    socket.emit("joinRoom", room);
    localStorage.setItem("currentRoom", JSON.stringify(room));
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
