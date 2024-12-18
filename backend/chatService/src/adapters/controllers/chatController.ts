import { GetMessagesUseCase } from "../../useCases/getMessagesUseCase";
import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants";

export class ChatController {
    constructor (
        private _getMessages : GetMessagesUseCase
    ) {}

    async getMessages(req: Request, res: Response) : Promise<void> {
        try {
            console.log('hiiiiiiii iam in insideeee')
            const {userId, receiverId} = req.params;
            console.log(req.params," req.bodydydydydyd")
            const response = await this._getMessages.execute(userId, receiverId);

            console.log(response,"responseseseseese")
            res.status(HttpStatusCode.OK).json({response})
        } catch (error) {
            console.log(error);
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({message: 'Internal error'})
        }
    }
}