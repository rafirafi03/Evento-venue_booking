import { io } from "socket.io-client";

export const socket = io("wss://api.eventobooking.site/chat", {
  path: "/socket.io",
  withCredentials: true,
  transports: ["websocket", "polling"],
});
