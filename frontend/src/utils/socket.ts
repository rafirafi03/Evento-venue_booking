import { io } from "socket.io-client";

export const socket = io("wss://api.eventobooking.site/chat", {
  transports: ["websocket"],
  autoConnect: false,
});
