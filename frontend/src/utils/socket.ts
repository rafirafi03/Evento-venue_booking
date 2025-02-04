import { io } from "socket.io-client";

export const socket = io("wss://api.eventobooking.site", {
  path: "/chat/socket.io",
  withCredentials: true,
  transports: ["websocket", "polling"],
});
