import ChatContainer from "../components/ChatContainer";
import RoomsContainer from "../components/RoomsContainer";
import MembersContainer from "../components/MembersContainer";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setCurrentRoom } from "../redux/features/chatSlice";
import useChatActions from "../hooks/useChatActions";

export default function Chat() {
  const dispatch = useAppDispatch();
  const { joinRoom } = useChatActions();

  // Join the last room the user was in on page load
  useEffect(() => {
    const lastPickedRoom = localStorage.getItem("currentRoom");
    if (lastPickedRoom) {
      dispatch(setCurrentRoom(JSON.parse(lastPickedRoom)));
      joinRoom(JSON.parse(lastPickedRoom));
    }
  }, []);

  return (
    <>
      <div className="grid items-center align-center w-full h-screen bg-chat-background bg-no-repeat bg-cover text-white">
        <div className="flex w-[90%] h-[90%] m-auto rounded-2xl bg-black overflow-hidden">
          <RoomsContainer />
          <MembersContainer />
          <ChatContainer />
        </div>
      </div>
    </>
  );
}
