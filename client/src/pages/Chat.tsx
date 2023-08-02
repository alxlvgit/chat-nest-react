// import { useState } from "react";
// import { useEffect } from "react";
import { Socket } from "socket.io-client";
import ChatWrapper from "../components/ChatWrapper";

export default function Chat({ socket }: { socket: Socket }) {
  // const [message, setMessage] = useState<string>("");
  // useEffect(() => {
  //   socket.on("message", (message: string) => {
  //     console.log("Received message from server:", message);
  //     setMessage(message);
  //   });
  // }, [socket]);

  // const sendMessageToServer = () => {
  //   socket.emit(
  //     "sendMessage",
  //     "Hello, server! This is a message from the client."
  //   );
  // };
  return (
    <>
      <ChatWrapper></ChatWrapper>
    </>
  );
}
