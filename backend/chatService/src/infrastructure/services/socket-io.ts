import { Server } from 'socket.io';
import { HttpMethod } from '../../constants';
import { SaveMessagesUseCase } from '../../useCases';
import { ChatRepository } from '../../repository/implementation/chatRepository';


export const initializeSocket = (httpServer: any) => {

  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: [HttpMethod.GET, HttpMethod.POST]
    }
  });

  const chatRepository = new ChatRepository()
  const saveMessageUseCase = new SaveMessagesUseCase(chatRepository)
  
  
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
  
    socket.on('send_message', async(data) => {

      const message = {
        senderId: data.senderId,
        receiverId : data.receiverId,
        text: data.text,
        timestamp: data.timestamp,
        sender: data.sender
      }
      try {

        await saveMessageUseCase.execute(message);
        io.emit("receive_message", data);
      } catch (error) {
        console.error("Error saving message:", error);
        socket.emit("error", { message: "Failed to save message" });
      }
      console.log('Message received:', data);
      io.emit('receive_message', data);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
}
