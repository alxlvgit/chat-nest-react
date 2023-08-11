import ChatWrapper from "../components/ChatWrapper";
import { ChatProvider } from "../context/ChatProvider";

export default function Chat() {
  return (
    <>
      <ChatProvider>
        <ChatWrapper></ChatWrapper>
      </ChatProvider>
    </>
  );
}
