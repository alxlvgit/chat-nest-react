import useChatActions from "../hooks/useChatActions";
import useChatRooms from "../hooks/useChatRooms";
import { setCurrentRoom } from "../redux/features/chatSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const RoomsContainer = () => {
  const { chatRooms } = useChatRooms();
  const { joinRoom } = useChatActions();
  const dispatch = useAppDispatch();
  const currentRoom = useAppSelector((state) => state.chatSlice.currentRoom);

  return (
    <div className="groups-container flex flex-col h-full p-4 col-auto border-r-4 border-gray-800 border-opacity-90">
      <div className="groups-header flex justify-between items-center p-2"></div>
      <div className="groups-list flex flex-col h-full justify-center">
        {chatRooms.map((room) => (
          <button
            className="w-16 h-16 my-4 flex justify-center align-middle items-center p-1 bg-teal-700 bg-opacity-40 rounded-full border border-gray-500 border-opacity-50  outline-2 outline-cyan-700 cursor-pointer hover:bg-opacity-20"
            key={room.id}
            onClick={() => {
              currentRoom?.id !== room.id && joinRoom(room);
              dispatch(setCurrentRoom(room));
            }}
          >
            <h1 className="text-center max-w-full max-h-full text-xs font-bold break-words">
              {room.name}
            </h1>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoomsContainer;
