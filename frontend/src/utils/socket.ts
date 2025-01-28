import { io } from "socket.io-client";

export const socket = io("http://api.eventobooking.site/chat", {
  transports: ["websocket"],
  autoConnect: false,
});
