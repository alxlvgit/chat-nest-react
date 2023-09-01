import { IClientMessage, IRoom, IUser } from "../interfaces/interfaces";
import socket from "../utils/socketUtil";

const useChatActions = () => {
  const sendMessageToServer = (message: IClientMessage) => {
    socket.emit("messageFromClient", message);
  };

  const enterRoom = (room: IRoom, user: IUser) => {
    const data = { room, user };
    socket.emit("enterRoom", data);
  };

  const requestToJoinRoom = (room: IRoom, user: IUser) => {
    const joinRequestData = { room, user };
    socket.emit("requestJoinRoom", joinRequestData);
  };

  const leaveRoom = (room: IRoom) => {
    socket.emit("leaveRoom", room);
  };

  return {
    sendMessageToServer,
    enterRoom,
    leaveRoom,
    requestToJoinRoom,
  };
};

export default useChatActions;
