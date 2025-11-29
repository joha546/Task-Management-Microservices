import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import config from './config/index.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
const PORT = config.port;
const MONGO_URI = config.mongoURI;

app.use(bodyParser.json());
app.use('/api/task', taskRoutes);

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Mongodb Connected.');

        app.listen(PORT, () => {
            console.log(`Task Service is running on ${PORT}`);
        })
    })
    .catch((err) => {
        console.log("Mongodb connection error:", err);
        process.exit(1);
    })