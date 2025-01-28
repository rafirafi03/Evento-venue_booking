import { io } from "socket.io-client";

export const socket = io("wss://api.eventobooking.site", {
  transports: ["websocket","polling"],
  autoConnect: false,
  path: 'chat/socket.io/',
});
