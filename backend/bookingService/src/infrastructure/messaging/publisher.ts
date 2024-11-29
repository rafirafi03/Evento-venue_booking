import { rabbitMQ } from "../rabbitmq/rabbitmq";

export async function publishRefundMessage(data: { userId: string; amount: number; transactionType: string; date: string }): Promise<void> {
  await rabbitMQ.connect();
  const channel = await rabbitMQ.getChannel();

  console.log('publisher workedddddd')

  const exchange = "bookingExchange";
  const routingKey = "refund";

  console.log(data," data in publisherererererererer")

  await channel.assertExchange(exchange, "direct", { durable: true });
  await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(data)));

  console.log(`Refund message published: ${JSON.stringify(data)}`);
}
