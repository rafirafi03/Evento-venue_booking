import { io } from "socket.io-client";

export const socket = io("wss://api.eventobooking.site", {
  transports: ["websocket","polling"],
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 10000,
  path: '/socket.io/',
});
