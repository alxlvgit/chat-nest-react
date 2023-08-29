import { useRef } from "react";
import { useAuth } from "../context/AuthProvider";
import useChatActions from "../hooks/useChatActions";
import { useAppSelector } from "../redux/hooks";

const ChatForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { sendMessageToServer } = useChatActions();
  const { user } = useAuth();
  const room = useAppSelector((state) => state.chatSlice.currentRoom);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = inputRef.current!.value.trim();
    const createdAt = new Date().toISOString();
    const message = {
      content,
      createdAt,
      senderEmail: user!.email,
      senderName: user!.firstName,
      room,
    };
    if (content.length > 0 && room) {
      sendMessageToServer(message);
      inputRef.current!.value = "";
    } else {
      console.log("No room selected or message is empty");
      inputRef.current!.value = "";
    }
  };

  return (
    <div className="chat-form flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          ref={inputRef}
          type="text"
          className="text-black w-full p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type a message..."
        />
        <button type="submit" className="bg-blue-400 rounded-md p-2 ml-2">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
