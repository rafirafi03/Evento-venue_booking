import { io } from "socket.io-client";

export const socket = io("https://api.eventobooking.site", {
  transports: ["websocket"],
  autoConnect: false,
});
