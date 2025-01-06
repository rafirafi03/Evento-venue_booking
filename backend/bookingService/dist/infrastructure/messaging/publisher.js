"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishRefundMessage = publishRefundMessage;
const rabbitmq_1 = require("../rabbitmq/rabbitmq");
async function publishRefundMessage(data) {
    await rabbitmq_1.rabbitMQ.connect();
    const channel = await rabbitmq_1.rabbitMQ.getChannel();
    console.log('publisher workedddddd');
    const exchange = "bookingExchange";
    const routingKey = "refund";
    console.log(data, " data in publisherererererererer");
    await channel.assertExchange(exchange, "direct", { durable: true });
    await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(data)));
    console.log(`Refund message published: ${JSON.stringify(data)}`);
}
