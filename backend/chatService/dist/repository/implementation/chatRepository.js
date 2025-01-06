"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepository = void 0;
const chatModels_1 = __importDefault(require("../../infrastructure/db/models/chatModels"));
class ChatRepository {
    saveMessage(chat) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(chat, "chatttttt");
                const newChat = new chatModels_1.default(chat);
                console.log(newChat, "new chatttt");
                const savedChat = yield newChat.save();
                console.log(savedChat, "saved chatttt");
                return savedChat;
            }
            catch (error) {
                console.log(error, "error in catch");
                throw new Error('error in DB' + error);
            }
        });
    }
    getMessages(senderId, receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield chatModels_1.default.find({
                    $or: [
                        { senderId, receiverId },
                        { senderId: receiverId, receiverId: senderId },
                    ],
                }).sort({ timestamp: 1 });
                console.log(response, "responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
                return response;
            }
            catch (error) {
                throw new Error('error in DB' + error);
            }
        });
    }
}
exports.ChatRepository = ChatRepository;
