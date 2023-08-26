import { useAuth } from "../context/AuthProvider";
import useMessages from "../hooks/useMessages";
import ChatForm from "./ChatForm";
import LogoutButton from "./LogoutButton";
import { MessageContainer } from "./MessageContainer";

const ChatContainer = () => {
  const messages = useMessages();
  const { user } = useAuth();

  return (
    <div className="chatContainer flex flex-col w-full h-full relative">
      <div className="chatHeader items-center text-center p-4 border-b-4 border-gray-800 border-opacity-90 flex justify-between">
        <h1 className="text-lg font-bold">Group name</h1>
        <LogoutButton />
      </div>
      <div className="flex p-4 flex-col flex-grow overflow-y-auto">
        {messages.map((message) => (
          <MessageContainer
            key={message.id}
            incomingMessage={message.senderEmail !== user?.email}
            textContent={message.content}
            sender={message.senderName}
          />
        ))}
      </div>
      <div className="chatInput sticky bottom-0 w-3/4 m-auto border-gray-800 mb-4">
        <ChatForm></ChatForm>
      </div>
    </div>
  );
};

export default ChatContainer;
