import { io } from "socket.io-client";

export const socket = io("https://api.eventobooking.site/chat", {
  transports: ["websocket"],
  autoConnect: false,
});
