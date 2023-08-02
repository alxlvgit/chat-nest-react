import { useState } from "react";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

export default function TestMessageForm({ socket }: { socket: Socket }) {
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    socket.on("message", (message: string) => {
      console.log("Received message from server:", message);
      setMessage(message);
    });
  }, [socket]);

  const sendMessageToServer = () => {
    socket.emit(
      "sendMessage",
      "Hello, server! This is a message from the client."
    );
  };
  return (
    <div className="w-full text-center">
      <p className="text-xl text-center">{message}</p>
      <button
        className="bg-blue-300 rounded-md p-2"
        onClick={sendMessageToServer}
      >
        Send Test Message to Server
      </button>
    </div>
  );
}
