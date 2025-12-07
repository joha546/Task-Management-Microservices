import amqp from 'amqplib';
import config from './index.js';

// Rabbitmq connection establishment
let channel, connection;
const rabbitmq_url = config.RABBITMQ_URL;

export function getChannel(){
    return channel;
}

async function start(retries = 20, delay = 3000) {
  while(retries > 0){
    try {
      connection = await amqp.connect(rabbitmq_url);
      channel = await connection.createChannel();
      await channel.assertQueue('task_created', { durable: true });
      console.log('Notification service is listening to messages');

      channel.consume('task_created', (msg) => {
        if(!msg){
            return;
        }
        const taskData = JSON.parse(msg.content.toString());
        console.log('Notification: New Task: ', taskData.title);
        console.log('Full Task Data:', taskData);

        channel.ack(msg);
      });
      break;
    }
    catch(err){
      console.error('RabbitMQ connection failed:', err.message);
      retries--;
      if(retries === 0) throw err;
      console.log(`Retrying in ${delay}ms, attempts left: ${retries}`);
      await new Promise(r => setTimeout(r, delay));
    }
  }
}

export default start;