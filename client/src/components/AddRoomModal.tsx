import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import useChatActions from "../hooks/useChatActions";
import { useCreateRoomMutation } from "../services/chat.service";
import { setCurrentRoom, setRooms } from "../redux/features/chatSlice";

export default function AddRoomModal({
  isOpen,
  setModalClosed,
}: {
  isOpen: boolean;
  setModalClosed: () => void;
}) {
  const [roomName, setRoomName] = useState<string>("");
  const [createRoom] = useCreateRoomMutation();
  const dispatch = useAppDispatch();
  const currentRoom = useAppSelector((state) => state.chatSlice.currentRoom);
  const { enterRoom } = useChatActions();
  const user = useAppSelector((state) => state.authSlice.user);

  const handleCreateRoom = async () => {
    console.log("Creating test room...");
    const response = await createRoom({ name: roomName });
    if ("data" in response) {
      const rooms = response.data.rooms;
      dispatch(setRooms(rooms));
      dispatch(setCurrentRoom(rooms[rooms.length - 1]));
      currentRoom?.id !== rooms[rooms.length - 1].id &&
        user &&
        enterRoom(rooms[rooms.length - 1], user);
      setModalClosed();
    }
  };

  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex m-auto mt-10 bg-white flex-col justify-center sm:w-1/3 w-4/5 gap-5 rounded-lg border p-8 ">
        <div className="flex justify-end">
          <button
            onClick={setModalClosed}
            className="text-white rounded-md px-3 py-1 w-fit bg-red-500 hover:bg-red-600"
          >
            X
          </button>
        </div>
        <form className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="receiptDate">
            Room Name
          </label>
          <input
            className="block w-full py-2 px-3 border-none bg-gray-100  h-11 rounded-xl shadow-lg text-black hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
            type="text"
            name="roomName"
            id="roomName"
            value={roomName}
            onChange={(event) => setRoomName(event.target.value)}
          />
        </form>
        <div className="flex justify-start w-full">
          <button
            onClick={handleCreateRoom}
            className="bg-blue-800 w-fit text-white rounded-md px-5 py-2 hover:bg-blue-600"
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
}
