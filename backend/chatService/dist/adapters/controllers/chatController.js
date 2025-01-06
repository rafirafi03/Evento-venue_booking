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
exports.ChatController = void 0;
const constants_1 = require("../../constants");
class ChatController {
    constructor(_getMessages) {
        this._getMessages = _getMessages;
    }
    getMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('hiiiiiiii iam in insideeee');
                const { userId, receiverId } = req.params;
                console.log(req.params, " req.bodydydydydyd");
                const response = yield this._getMessages.execute(userId, receiverId);
                console.log(response, "responseseseseese");
                res.status(constants_1.HttpStatusCode.OK).json({ response });
            }
            catch (error) {
                console.log(error);
                res.status(constants_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal error' });
            }
        });
    }
}
exports.ChatController = ChatController;
