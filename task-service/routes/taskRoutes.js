import express from 'express';
import Task from '../models/Task.js'
import { getChannel } from '../config/rabbitmq.js';

const router = express.Router();

router.post('/create', async(req, res) => {
    const {title, description, userId} = req.body;

    try{
        const task = new Task({title, description, userId});
        await task.save();

        // RabbitMQ message producing.
        const message = {taskId: task._id, userId, title};
        const channel = getChannel();

        if(!channel){
            return res.status(503).json({error: 'RabbitMQ not connected.'})
        }

        channel.sendToQueue('task_created', Buffer.from(
            JSON.stringify(message)),
            { persistent: true }  // ✅ survives restart
        );

        res.status(201).json(task)
    }
    catch(err){
        console.error('Error saving:', err);
        res.status(500).json(err);
    }
});

router.get('/all-tasks', async(req, res) => {
    try{
        const tasks = await Task.find();
        res.status(200).json(tasks);
    }
    catch(err){
        console.error('Error saving:', err);
        res.status(500).json(err);
    }
})

export default router;