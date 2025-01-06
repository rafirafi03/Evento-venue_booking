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
exports.initializeSocket = void 0;
const socket_io_1 = require("socket.io");
const constants_1 = require("../../constants");
const useCases_1 = require("../../useCases");
const chatRepository_1 = require("../../repository/implementation/chatRepository");
const initializeSocket = (httpServer) => {
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: "http://localhost:3000",
            methods: [constants_1.HttpMethod.GET, constants_1.HttpMethod.POST],
        },
    });
    const chatRepository = new chatRepository_1.ChatRepository();
    const saveMessageUseCase = new useCases_1.SaveMessagesUseCase(chatRepository);
    io.on("connection", (socket) => {
        socket.on("send_message", (data) => __awaiter(void 0, void 0, void 0, function* () {
            const message = {
                senderId: data.senderId,
                receiverId: data.receiverId,
                text: data.text,
                timestamp: new Date(),
                sender: data.sender,
            };
            try {
                yield saveMessageUseCase.execute(message);
                io.emit("receive_message", data);
            }
            catch (error) {
                console.error("Error saving message:", error);
                socket.emit("error", { message: "Failed to save message" });
            }
            io.emit("receive_message", data);
        }));
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
    return io;
};
exports.initializeSocket = initializeSocket;
