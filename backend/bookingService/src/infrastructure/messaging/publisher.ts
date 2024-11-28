import amqp from 'amqplib';

const QUEUE = 'wallet_updates';

export const publishToQueue = async (message: any) => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE, { durable: true });
    channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(message)));
    console.log(`Message sent to queue: ${message}`);
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Error publishing message:', error);
  }
};
