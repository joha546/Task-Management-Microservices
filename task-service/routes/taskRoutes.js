import express from 'express';
import Task from '../models/Task.js'

const router = express.Router();

router.post('/create', async(req, res) => {
    const {title, description, userId} = req.body;

    try{
        const task = new Task({title, description, userId});
        await task.save();
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