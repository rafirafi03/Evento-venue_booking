// import { io, Socket } from 'socket.io-client';

// interface Message {
//   id: number;
//   text: string;
//   sender: "user" | "contact";
//   timestamp: string;
//   userId: number;
//   receiverId: number;
// }

// interface ServerToClientEvents {
//   receive_message: (message: Message) => void;
// }

// interface ClientToServerEvents {
//   send_message: (message: Message) => void;
//   join_room: (userId: number) => void;
// }

// let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

// export const initSocket = () => {
//   if (socket) return socket;

//   socket = io(process.env.CHAT_SERVICE_PORT || 'http://localhost:4003', {
//     transports: ['websocket'],
//     autoConnect: true
//   });

//   return socket;
// };

// export const getSocket = () => {
//   if (!socket) {
//     return initSocket();
//   }
//   return socket;
// };

import { io } from 'socket.io-client';

export const socket = io('http://localhost:4004', {
  transports: ['websocket']
});