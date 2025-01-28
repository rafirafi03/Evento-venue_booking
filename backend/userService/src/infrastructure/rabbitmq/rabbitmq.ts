import amqplib, { Channel, Connection } from "amqplib";

class RabbitMQ {
  private connection: Connection | null = null;
  private channel: Channel | null = null;
  
  async connect(): Promise<void> {
    if (this.connection) return;
  
    let retries = 5;
    while (retries) {
      try {
        this.connection = await amqplib.connect({
          hostname: "rabbitmq",
          port: 5672,
          username: "admin",
          password: "password",
        });
        this.channel = await this.connection.createChannel();
        console.log("RabbitMQ connected!");
        break;
      } catch (error) {
        retries -= 1;
        console.error("RabbitMQ connection error, retrying in 5s:", error);
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  
    if (!this.connection) {
      throw new Error("RabbitMQ connection failed after retries");
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
