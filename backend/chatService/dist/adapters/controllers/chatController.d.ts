import { GetMessagesUseCase } from "../../useCases/getMessagesUseCase";
import { Request, Response } from "express";
export declare class ChatController {
    private _getMessages;
    constructor(_getMessages: GetMessagesUseCase);
    getMessages(req: Request, res: Response): Promise<void>;
}
