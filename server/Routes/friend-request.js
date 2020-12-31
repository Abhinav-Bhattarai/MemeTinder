import express from 'express';

const router = express.Router();

router.post('/', (req, res)=>{
    const YourName = req.body.YourName;
    const FriendName = req.body.FriendName;

})

export default router;