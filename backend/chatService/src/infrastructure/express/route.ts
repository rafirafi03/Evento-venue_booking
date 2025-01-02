import { Router } from "express";
import { ChatController } from "../../adapters/controllers";
import { ChatRepository } from "../../repository/implementation";
import { GetMessagesUseCase } from "../../useCases/getMessagesUseCase";
import { authMiddleware } from "evento-library";

const router = Router();

const chatRepository = new ChatRepository()

const getMessagesUseCase = new GetMessagesUseCase(chatRepository)

const chatController = new ChatController(getMessagesUseCase)

router.get('/getMessages/:userId/:receiverId', authMiddleware(['company','user']), (req, res) => {
    chatController.getMessages(req, res)
})


export default router;
