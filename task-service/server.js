import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import config from './config/index.js';
import taskRoutes from './routes/taskRoutes.js';
import connectRabbitMQWithRetry from './config/rabbitmq.js';

const app = express();
const PORT = config.port;
const MONGO_URI = config.mongoURI;

app.use(bodyParser.json());
app.use('/api/task', taskRoutes);

async function startServer(){
    try{
        await mongoose.connect(MONGO_URI)
            .then(() => {
                console.log('Mongodb Connected');

                connectRabbitMQWithRetry();
                console.log('RabbitMQ Ready');
                app.listen(PORT, () => {
                    console.log(`Task Service is running on ${PORT}`);
                })
            })
    }
    catch(err){
        console.error("Startup failed:", err);
        process.exit(1);
    }
}

startServer();
// mongoose.connect(MONGO_URI)
//     .then(() => {
//         console.log('Mongodb Connected.');

//         await connectRabbitMQWithRetry();
//         console.log('✅ RabbitMQ Ready');

//         app.listen(PORT, () => {
//             console.log(`Task Service is running on ${PORT}`);
//             connectRabbitMQWithRetry();
//         })
//     })
//     .catch((err) => {
//         console.log("Mongodb connection error:", err);
//         process.exit(1);
//     })