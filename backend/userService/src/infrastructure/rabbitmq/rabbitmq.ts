import amqplib, { Channel, Connection } from "amqplib";

class RabbitMQ {
  private connection: Connection | null = null;
  private channel: Channel | null = null;

  async connect(): Promise<void> {
    if (this.connection) return;

    try {
      this.connection = await amqplib.connect("amqp://host.docker.internal:5672");
      this.channel = await this.connection.createChannel();
      console.log("RabbitMQ connected!");
    } catch (error) {
      console.error("RabbitMQ connection error:", error);
    }
  }

  async getChannel(): Promise<Channel> {
    if (!this.channel) {
      throw new Error("RabbitMQ channel not initialized");
    }
    return this.channel;
  }

  async close(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
      console.log("RabbitMQ connection closed!");
    }
  }
}

export const rabbitMQ = new RabbitMQ();
