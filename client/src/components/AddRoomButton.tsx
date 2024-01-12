import useChatActions from "../hooks/useChatActions";
import { setCurrentRoom, setRooms } from "../redux/features/chatSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useCreateRoomMutation } from "../services/chat.service";

const AddRoomButton = () => {
  const [createRoom] = useCreateRoomMutation();
  const dispatch = useAppDispatch();
  const currentRoom = useAppSelector((state) => state.chatSlice.currentRoom);
  const { enterRoom } = useChatActions();
  const user = useAppSelector((state) => state.authSlice.user);

  const handleCreateRoom = async () => {
    console.log("Creating test room...");
    const response = await createRoom({ name: "test room" });
    if ("data" in response) {
      const rooms = response.data.rooms;
      dispatch(setRooms(rooms));
      dispatch(setCurrentRoom(rooms[rooms.length - 1]));
      currentRoom?.id !== rooms[rooms.length - 1].id &&
        user &&
        enterRoom(rooms[rooms.length - 1], user);
    }
  };

  return (
    <div
      onClick={handleCreateRoom}
      className="add-room-button mt-10 hover:bg-white w-12 h-12 rounded-full hover:cursor-pointer flex items-center justify-center"
    >
      <svg
        fill="#338a84"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#338a84"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={0}></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M10 1.6a8.4 8.4 0 1 0 0 16.8 8.4 8.4 0 0 0 0-16.8zm5 9.4h-4v4H9v-4H5V9h4V5h2v4h4v2z"></path>
        </g>
      </svg>
    </div>
  );
};
export default AddRoomButton;
