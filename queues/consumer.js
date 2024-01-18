const amqplib = require('amqplib');
const QUEUE_NAME = 'jobs-queue';
const message = process.argv[2];

const connect = async () => {
  try {
    const connection = await amqplib.connect('amqps://qqxheoig:w9T0CbOjbPFpt1xu0C1B9vr6lK4JvyGP@beaver.rmq.cloudamqp.com/qqxheoig');
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
