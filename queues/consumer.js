const amqplib = require('amqplib');
const QUEUE_NAME = 'jobs-queue';
require("dotenv").config();

const connect = async () => {
  try {
    const connection = await amqplib.connect(process.env.AMQP_URI);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME);
    
    channel.consume(QUEUE_NAME, (message) => {
      console.log(`Received ${message.content.toString()}`);
      channel.ack(message);
    });

  } catch (error) {
    console.error(error);
  }
}

connect();
