import { useCallback, useState } from "react";
import { useCookies } from "react-cookie";
import useChatActions from "../hooks/useChatActions";
import { IRoom } from "../interfaces/interfaces";
import { resetRoomState, setCurrentRoom } from "../redux/features/chatSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import AddRoomButton from "./AddRoomButton";
import { twMerge } from "tailwind-merge";
import useChatRooms from "../hooks/useChatRooms";
import Room from "./Room";
import AddRoomModal from "./AddRoomModal";

const RoomsContainer = () => {
  const { enterRoom } = useChatActions();
  const dispatch = useAppDispatch();
  const currentRoom = useAppSelector((state) => state.chatSlice.currentRoom);
  const { chatRooms, hideRooms, isLoading } = useChatRooms();
  const [cookies] = useCookies(["user"]);
  const user = cookies["user"];

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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
        "groups-container justify-center align-middle items-center h-full p-4 col-auto border-r-4 max-w-[100px]  border-gray-800 border-opacity-90",
        hideRooms ? "hidden sm:flex flex-col" : "flex flex-col"
      )}
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-base font-bold text-center animate-pulse">
            Loading the rooms...
          </h1>
        </div>
      ) : (
        <div className="groups-list flex flex-col items-center h-full justify-center">
          {chatRooms.map((room) => (
            <Room
              key={room.name}
              name={room.name}
              onClick={() => handleRoomClick(room)}
              isActive={room.id === currentRoom?.id}
            ></Room>
          ))}
          <AddRoomButton openModal={openModal} />
          <AddRoomModal isOpen={isModalOpen} setModalClosed={closeModal} />
        </div>
      )}
    </div>
  );
};

export default RoomsContainer;
