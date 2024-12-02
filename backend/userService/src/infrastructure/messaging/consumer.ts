import { rabbitMQ } from "../rabbitmq/rabbitmq";
import { UpdateWalletUseCase } from "../../useCases";
import { UserRepository } from "../../repositories";

export async function consumeRefundMessages(): Promise<void> {
  await rabbitMQ.connect();
  const channel = await rabbitMQ.getChannel();

  console.log('consumer getteddddddd')

  const exchange = "bookingExchange";
  const queue = "refundQueue";
  const routingKey = "refund";

  await channel.assertExchange(exchange, "direct", { durable: true });
  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, exchange, routingKey);

  const userRepository = new UserRepository()

  const updateWalletUseCase = new UpdateWalletUseCase(userRepository)

  channel.consume(queue, async (message) => {
    if (message) {
      const data = JSON.parse(message.content.toString());

      console.log(data," data in consumerrrrrrr rr r rr r r ")

      const { userId, amount, transactionType, date } = data

      console.log(`Refund message received: ${JSON.stringify(data)}`);

      try {
        await updateWalletUseCase.execute(userId, amount, transactionType, date );
        console.log("Wallet updated successfully!");
        channel.ack(message);
      } catch (error) {
        console.error("Error processing message:", error);
        // Optionally, reject or requeue the message
        channel.nack(message);
      }
      
      // Handle wallet update logic
      // await updateWallet(data.userId, data.amount);
    }
  });


  channel.on("error", (err) => console.error("Channel error:", err));
  channel.on("close", () => console.warn("Channel closed. Reinitializing..."));
  
  console.log("Refund consumer listening...");
}
