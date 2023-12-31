import { useCallback, useRef } from "react";
import { useCookies } from "react-cookie";
import useChatActions from "../hooks/useChatActions";
import { useAppSelector } from "../redux/hooks";

const ChatForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { sendMessageToServer } = useChatActions();
  const [cookies] = useCookies(["user"]);
  const user = cookies["user"];
  const room = useAppSelector((state) => state.chatSlice.currentRoom);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const content = inputRef.current!.value.trim();
      const createdAt = Date.now();
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
    },
    [inputRef, sendMessageToServer, user, room]
  );

  return (
    <div className="chat-form flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          ref={inputRef}
          type="text"
          className="text-black w-full p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="ml-4 p-2 rounded-md bg-cyan-800 text-sm"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
