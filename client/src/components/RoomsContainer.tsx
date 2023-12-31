import { useCallback } from "react";
import { useCookies } from "react-cookie";
import useChatActions from "../hooks/useChatActions";
import { IRoom } from "../interfaces/interfaces";
import { resetRoomState, setCurrentRoom } from "../redux/features/chatSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import AddRoomButton from "./AddRoomButton";
import { twMerge } from "tailwind-merge";
import useChatRooms from "../hooks/useChatRooms";
import Room from "./Room";

const RoomsContainer = () => {
  const { enterRoom } = useChatActions();
  const dispatch = useAppDispatch();
  const currentRoom = useAppSelector((state) => state.chatSlice.currentRoom);
  const { chatRooms, hideRooms } = useChatRooms();
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
    <div
      className={twMerge(
        "groups-container justify-center align-middle items-center h-full p-4 col-auto border-r-4 border-gray-800 border-opacity-90",
        hideRooms ? "hidden sm:flex flex-col" : "flex flex-col"
      )}
    >
      <div className="groups-list flex flex-col items-center h-full justify-center">
        {chatRooms.map((room) => (
          <Room
            key={room.name}
            name={room.name}
            onClick={() => handleRoomClick(room)}
            isActive={room.id === currentRoom?.id}
          ></Room>
        ))}
        <AddRoomButton />
      </div>
    </div>
  );
};

export default RoomsContainer;
