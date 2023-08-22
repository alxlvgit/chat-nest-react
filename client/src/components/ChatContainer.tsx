import { useChat } from "../context/ChatProvider";
import useMessages from "../hooks/useMessages";
import ChatForm from "./ChatForm";
import { MessageContainer } from "./MessageContainer";

const ChatContainer = () => {
  const messages = useMessages();
  const { socket } = useChat();

  return (
    <div className="chatContainer flex flex-col w-full h-full relative">
      <div className="chatHeader items-center text-center p-4 border-b-4 border-gray-800 border-opacity-90">
        <h1 className="text-lg font-bold">Chat</h1>
      </div>
      <div className="flex p-4 flex-col flex-grow overflow-y-auto">
        {messages.map((message) => (
          <MessageContainer
            key={message.id}
            incomingMessage={message.senderId !== socket.id}
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
