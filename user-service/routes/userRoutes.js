import express from 'express';
import User from '../models/User.js'

const router = express.Router();

router.post('/create', async(req, res) => {
    const {name, email} = req.body;

    try{
        const user = new User({name, email});
        await user.save();
        res.status(201).json(user)
    }
    catch(err){
        console.error('Error saving:', err);
        res.status(500).json(err);
    }
})

export default router;