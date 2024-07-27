import amqp, { Channel, ConsumeMessage } from "amqplib";

let channel: Channel | null = null;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    channel = await connection.createChannel();

    const queue = "household_queue";

    await channel.assertQueue(queue, { durable: true });

    console.log("[RabbitMq] Connected and queue is set up");

    channel.consume(queue, (message: ConsumeMessage | null) => {
      if (message !== null) {
        console.log(
          `[RabbitMQ] Received message: ${message.content.toString()}`,
        );
        channel?.ack(message);
      }
    });
  } catch (error) {
    console.error("[RabbitMQ] Failed to connect", error);
  }
};
