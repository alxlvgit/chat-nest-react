import { useCookies } from "react-cookie";
import useChatActions from "../hooks/useChatActions";
import useRoomData from "../hooks/useRoomData";
import { useAppSelector } from "../redux/hooks";
import ChatForm from "./ChatForm";
import LogoutButton from "./LogoutButton";
import { MessageContainer } from "./MessageContainer";
import ToggleRooms from "../components/ToggleRooms";

const ChatContainer = () => {
  useRoomData();
  const [cookies] = useCookies(["user"]);
  const user = cookies["user"];
  const currentRoom = useAppSelector((state) => state.chatSlice.currentRoom);
  const roomMembers = useAppSelector((state) => state.chatSlice.roomMembers);
  const messages = useAppSelector((state) => state.chatSlice.messages);
  const { requestToJoinRoom } = useChatActions();
  const isMember = currentRoom?.isMember;

  return (
    <div className="chat-container flex flex-col w-full h-full relative">
      <div className="chat-header sm:items-center text-center p-4 border-b-4 border-gray-800 border-opacity-90 flex flex-col items-start sm:flex-row sm:justify-between">
        <div className="flex flex-row items-center mb-3 sm:mb-0">
          <ToggleRooms />
          {currentRoom && (
            <div className="members-list flex flex-col items-start">
              <h1 className="text-lg font-bold">{currentRoom?.name}</h1>
              <p className="text-xs text-gray-500 font-bold">
                {isMember && `Members: ${roomMembers.length}`}
              </p>
            </div>
          )}
        </div>
        <LogoutButton />
      </div>
      <div className="flex p-4 flex-col flex-grow overflow-y-auto">
        {!currentRoom && (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-bold text-center">
              Welcome to Chat App!{" "}
            </h1>
            <p className="text-lg font-bold text-center">
              Please select a room to start chatting
            </p>
          </div>
        )}
        {user && currentRoom && !isMember && (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-bold text-center">
              You are not a member of this room
            </h1>
            <button
              onClick={() => requestToJoinRoom(currentRoom, user)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-5 rounded"
            >
              Join Room
            </button>
          </div>
        )}
        {user &&
          currentRoom &&
          isMember &&
          (messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-2xl font-bold">
                There are no messages in this room
              </h1>
              <p className="text-lg font-bold">
                Please send a message to start chatting
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <MessageContainer
                key={message.id}
                incomingMessage={message.senderEmail !== user?.email}
                textContent={message.content}
                sender={message.senderName}
                createdAt={message.createdAt}
              />
            ))
          ))}
      </div>
      <div className="chatInput sticky bottom-0 w-3/4 m-auto border-gray-800 mb-4">
        <ChatForm></ChatForm>
      </div>
    </div>
  );
};

export default ChatContainer;
