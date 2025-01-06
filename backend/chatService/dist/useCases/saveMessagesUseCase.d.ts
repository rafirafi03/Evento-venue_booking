import { IChatRepository } from "../repository";
import { Chat } from "../entity/chatEntity";
export declare class SaveMessagesUseCase {
    private _chatRepository;
    constructor(_chatRepository: IChatRepository);
    execute(message: Chat): Promise<{
        success: boolean;
    }>;
}
