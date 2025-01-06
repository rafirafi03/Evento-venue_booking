"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitMQ = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
class RabbitMQ {
    constructor() {
        this.connection = null;
        this.channel = null;
    }
    async connect() {
        if (this.connection)
            return;
        try {
            this.connection = await amqplib_1.default.connect("amqp://localhost");
            this.channel = await this.connection.createChannel();
            console.log("RabbitMQ connected!");
        }
        catch (error) {
            console.error("RabbitMQ connection error:", error);
        }
    }
    async getChannel() {
        if (!this.channel) {
            throw new Error("RabbitMQ channel not initialized");
        }
        return this.channel;
    }
    async close() {
        if (this.connection) {
            await this.connection.close();
            console.log("RabbitMQ connection closed!");
        }
    }
}
exports.rabbitMQ = new RabbitMQ();
