import useChatActions from "../hooks/useChatActions";
import useChatRooms from "../hooks/useChatRooms";
import { IRoom } from "../interfaces/interfaces";
import { setCurrentRoom } from "../redux/features/chatSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Room from "./Room";

const RoomsContainer = () => {
  const { chatRooms } = useChatRooms();
  const { joinRoom } = useChatActions();
  const dispatch = useAppDispatch();
  const currentRoom = useAppSelector((state) => state.chatSlice.currentRoom);

  const handleRoomClick = (room: IRoom) => {
    currentRoom?.id !== room.id && joinRoom(room);
    dispatch(setCurrentRoom(room));
  };

  return (
    <div className="groups-container flex flex-col h-full p-4 col-auto border-r-4 border-gray-800 border-opacity-90">
      <div className="groups-list flex flex-col h-full justify-center">
        {chatRooms.map((room) => (
          <Room
            key={room.id}
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
