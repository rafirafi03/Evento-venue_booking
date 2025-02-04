import { Server } from "socket.io";
import { HttpMethod } from "../../constants";
import { SaveMessagesUseCase } from "../../useCases";
import { ChatRepository } from "../../repository/implementation/chatRepository";
import dotenv from 'dotenv'

dotenv.config()

export const initializeSocket = (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_PORT,
      methods: [HttpMethod.GET, HttpMethod.POST],
      credentials: true
    },
    path: "/chat/socket.io",
    transports: ["websocket", "polling"],
    
  });

  const chatRepository = new ChatRepository();
  const saveMessageUseCase = new SaveMessagesUseCase(chatRepository);

  io.on("connection", (socket) => {

    socket.on("send_message", async (data) => {
      const message = {
        senderId: data.senderId,
        receiverId: data.receiverId,
        text: data.text,
        timestamp: new Date(),
        sender: data.sender,
      };
      try {
        await saveMessageUseCase.execute(message);
        io.emit("receive_message", data);
      } catch (error) {
        console.error("Error saving message:", error);
        socket.emit("error", { message: "Failed to save message" });
      }
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);  // Add error logging
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;  
};
