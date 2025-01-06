import { Chat } from '../../entity/chatEntity';
export interface IChatRepository {
    saveMessage(chat: Chat): Promise<Chat>;
    getMessages(senderId: string, receiverId: string): Promise<Chat[]>;
}
