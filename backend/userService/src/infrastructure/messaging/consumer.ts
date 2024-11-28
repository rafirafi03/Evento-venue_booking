import amqp from 'amqplib';

const QUEUE = 'wallet_updates';

export const consumeMessages = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE, { durable: true });

    console.log('Waiting for messages...');
    channel.consume(
      QUEUE,
      async (msg) => {
        if (msg !== null) {
          const message = JSON.parse(msg.content.toString());
          console.log('Received message:', message);

          // Process the wallet update
          const { userId, refundAmount } = message;
        //   await updateWallet(userId, refundAmount);

          // Acknowledge the message
          channel.ack(msg);
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error('Error consuming messages:', error);
  }
};
