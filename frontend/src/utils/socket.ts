import { io } from "socket.io-client";

export const socket = io("wss://api.eventobooking.site", {
  transports: ["websocket"],
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
