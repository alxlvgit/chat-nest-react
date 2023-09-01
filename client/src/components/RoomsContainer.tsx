import { useCallback } from "react";
import { useCookies } from "react-cookie";
import useChatActions from "../hooks/useChatActions";
import useChatRooms from "../hooks/useChatRooms";
import { IRoom } from "../interfaces/interfaces";
import { resetRoomState, setCurrentRoom } from "../redux/features/chatSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Room from "./Room";

const RoomsContainer = () => {
  const { chatRooms } = useChatRooms();
  const { enterRoom } = useChatActions();
  const dispatch = useAppDispatch();
  const currentRoom = useAppSelector((state) => state.chatSlice.currentRoom);
  const [cookies] = useCookies(["user"]);
  const user = cookies["user"];

  const handleRoomClick = useCallback(
    (room: IRoom) => {
      const isMember = room.isMember;
      if (!isMember) {
        dispatch(resetRoomState());
        dispatch(setCurrentRoom(room));
      } else {
        dispatch(setCurrentRoom(room));
        currentRoom?.id !== room.id && enterRoom(room, user);
      }
    },
    [currentRoom, dispatch, enterRoom, user]
  );

  return (
    <div className="groups-container flex flex-col h-full p-4 col-auto border-r-4 border-gray-800 border-opacity-90">
      <div className="groups-list flex flex-col h-full justify-center">
        {chatRooms.map((room) => (
          <Room
            key={room.name}
            name={room.name}
            onClick={() => handleRoomClick(room)}
            isActive={room.id === currentRoom?.id}
          ></Room>
        ))}
      </div>
    </div>
  );
};

export default RoomsContainer;
