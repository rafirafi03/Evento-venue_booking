import { Chat } from "../../entity/chatEntity";
import { IChatRepository } from "../interfaces";
export declare class ChatRepository implements IChatRepository {
    saveMessage(chat: Chat): Promise<Chat>;
    getMessages(senderId: string, receiverId: string): Promise<Chat[]>;
}
