"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../adapters/controllers");
const implementation_1 = require("../../repository/implementation");
const getMessagesUseCase_1 = require("../../useCases/getMessagesUseCase");
const evento_library_1 = require("evento-library");
const router = (0, express_1.Router)();
const chatRepository = new implementation_1.ChatRepository();
const getMessagesUseCase = new getMessagesUseCase_1.GetMessagesUseCase(chatRepository);
const chatController = new controllers_1.ChatController(getMessagesUseCase);
router.get('/getMessages/:userId/:receiverId', (0, evento_library_1.authMiddleware)(['company', 'user']), (req, res) => {
    chatController.getMessages(req, res);
});
exports.default = router;
