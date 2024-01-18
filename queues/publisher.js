const amqplib = require('amqplib');
const QUEUE_NAME = 'jobs-queue';
const message = process.argv[2];
require("dotenv").config();

const connect = async () => {
  try {
    const connection = await amqplib.connect(process.env.AMQP_URI);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME);
    await channel.sendToQueue(QUEUE_NAME, Buffer.from(message));
    console.log(`Sent ${message}`);
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error(error);
  }
}

connect();
