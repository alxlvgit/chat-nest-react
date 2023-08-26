import { io } from "socket.io-client";
const socket = io(
  import.meta.env.VITE_NESTJS_SERVER_URL || "http://localhost:3000"
);
export default socket;
