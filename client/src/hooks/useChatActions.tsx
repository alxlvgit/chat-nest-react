import { IClientMessage, IStoredRoom, IUser } from "../interfaces/interfaces";
import socket from "../utils/socketUtil";

const useChatActions = () => {
  const sendMessageToServer = (message: IClientMessage) => {
    socket.emit("messageFromClient", message);
  };

  const joinRoom = (room: IStoredRoom, user: IUser) => {
    const joinObject = { room, user };
    socket.emit("joinRoom", joinObject);
    localStorage.setItem("currentRoom", JSON.stringify(room));
  };

  const leaveRoom = (room: IStoredRoom) => {
    socket.emit("leaveRoom", room);
  };

  return {
    sendMessageToServer,
    joinRoom,
    leaveRoom,
  };
};

export default useChatActions;
