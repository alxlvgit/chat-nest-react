import { useRef } from "react";
import useChatActions from "../hooks/useChatActions";

const ChatForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { sendMessageToServer } = useChatActions();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = inputRef.current!.value.trim();
    if (text.length > 0) {
      sendMessageToServer(text);
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
