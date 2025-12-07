import amqp from 'amqplib';
import config from './index.js';

// Rabbitmq connection establishment
let channel, connection;
const rabbitmq_url = config.RABBITMQ_URL;

export function getChannel(){
    return channel;
}

async function connectRabbitMQWithRetry(retries = 5, delay = 3000){
    while(retries>0){
        try{
            connection = await amqp.connect(rabbitmq_url);
            channel = await connection.createChannel();
            await channel.assertQueue('task_created', {durable: true});
            console.log('RabbitMQ connection established');
            break;
        }
        catch(error){
            console.error('Error saving:', error.message);
            retries--;
            console.log('Retrying again:', retries);
            if(retries === 0){
                throw error
            }
            await new Promise(res => setTimeout(res, delay));
        }
    }
}

export default connectRabbitMQWithRetry;