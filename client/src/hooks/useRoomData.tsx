import { useEffect } from "react";
import { IRoom, IStoredMessage, IStoredRoom } from "../interfaces/interfaces";
import { useAppDispatch } from "../redux/hooks";
import socket from "../utils/socketUtil";
import {
  addMessage,
  setStoredMessages,
  setRoomMembers,
  updateRooms,
  setCurrentRoom,
} from "../redux/features/chatSlice";

const useRoomData = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on("messageFromServer", (message: IStoredMessage) => {
      dispatch(addMessage(message));
    });

    socket.on("roomData", (roomData: IStoredRoom) => {
      const { messages, participants } = roomData;
      dispatch(setStoredMessages(messages));
      dispatch(setRoomMembers(participants));
    });

    socket.on("successfullyJoinedNewRoom", (newRoom: IStoredRoom) => {
      const { id, name, isMember } = newRoom;
      dispatch(updateRooms(newRoom));
      dispatch(setCurrentRoom({ id, name, isMember } as IRoom));
    });

    socket.on("newMemberInRoom", (participants) => {
      dispatch(setRoomMembers(participants));
    });

    return () => {
      socket.off("messageFromServer");
      socket.off("roomData");
      socket.off("joinedNewRoom");
    };
  }, [socket]);
};

export default useRoomData;
