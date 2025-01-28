import { io } from "socket.io-client";

export const socket = io("wss://api.eventobooking.site/socket.io", {
  transports: ["websocket"],
  autoConnect: false,
});
