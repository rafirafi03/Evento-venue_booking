import { Chat } from "../../entity/chatEntity";
import { IChatRepository } from "../interfaces";
import ChatModel from "../../infrastructure/db/models/chatModels";

export class ChatRepository implements IChatRepository {
  async saveMessage(chat: Chat): Promise<Chat> {
    const newChat = new ChatModel(chat);
    return await newChat.save();
  }

  async getMessages(senderId: string, receiverId: string): Promise<Chat[]> {
    const response = await ChatModel.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ timestamp: 1 });

    console.log(response,"responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")

    return response;
  }
}
