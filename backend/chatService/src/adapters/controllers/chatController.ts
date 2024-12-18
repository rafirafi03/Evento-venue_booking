import { GetMessagesUseCase } from "../../useCases/getMessagesUseCase";
import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants";

export class ChatController {
    constructor (
        private _getMessages : GetMessagesUseCase
    ) {}

    async getMessages(req: Request, res: Response) : Promise<void> {
        try {
            const {senderId, receiverId} = req.body;
            console.log(req.body," req.bodydydydydyd")
            await this._getMessages.execute(senderId, receiverId)
        } catch (error) {
            console.log(error);
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({message: 'Internal error'})
        }
    }
}