import { Chat } from "../../entity/chatEntity";
import { IChatRepository } from "../interfaces";
import ChatModel from "../../infrastructure/db/models/chatModels";

export class ChatRepository implements IChatRepository {
  async saveMessage(chat: Chat): Promise<Chat> {
    try {
      console.log(chat,"chatttttt")
    const newChat = new ChatModel(chat);
    console.log(newChat,"new chatttt")
    const savedChat = await newChat.save();
    console.log(savedChat,"saved chatttt")
    return savedChat
    } catch (error) {
      console.log(error,"error in catch")
      throw new Error('error in DB'+ error)
    }
    
  }

  async getMessages(senderId: string, receiverId: string): Promise<Chat[]> {
    try {
      const response = await ChatModel.find({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      }).sort({ timestamp: 1 });
    
      return response;
    } catch (error) {
      throw new Error('error in DB'+ error)

    }
    
  }
}
