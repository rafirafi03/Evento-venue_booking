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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMessagesUseCase = void 0;
class GetMessagesUseCase {
    constructor(_chatRepository) {
        this._chatRepository = _chatRepository;
    }
    execute(senderId, receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(senderId, "senderIdddddd");
                const response = this._chatRepository.getMessages(senderId, receiverId);
                console.log(response, "responseeeee");
                return response;
            }
            catch (error) {
                console.log(error);
                return [];
            }
        });
    }
}
exports.GetMessagesUseCase = GetMessagesUseCase;
