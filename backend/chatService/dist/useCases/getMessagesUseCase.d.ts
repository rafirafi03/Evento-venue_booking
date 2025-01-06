import { IChatRepository } from "../repository";
import { Chat } from "../entity/chatEntity";
export declare class GetMessagesUseCase {
    private _chatRepository;
    constructor(_chatRepository: IChatRepository);
    execute(senderId: string, receiverId: string): Promise<Chat[]>;
}
