import express from 'express';
import RegisterModel from '../Models/register-model.js';

const router = express.Router();

router.post('/', (req, res)=>{
    const YourName = req.body.YourName;
    const FriendName = req.body.FriendName;
    RegisterModel.findOne({ Username: YourName }).exec().then((my_profile)=>{
        const Requests = [...my_profile.Requests];
        const index = Requests.findIndex((element)=>{
            return element.sender === FriendName;
        });
        Requests.splice(index, 1);
        my_profile.Requests = Requests;
        my_profile.save().then(()=>{
            RegisterModel.findOne({ Username: FriendName }).exec().then((friend_profile)=>{
                const friend_profile_Requests = [...my_profile.Requests];
                const friend_profile_index = friend_profile_Requests.findIndex((element)=>{
                    return element.sender === YourName;
                });
                Requests.splice(friend_profile_index, 1);
                friend_profile.Requests = Requests;
                friend_profile.save().then(()=>{
                    return res.json({ request_deleted: true })
                });
            })
        })
    })
})

export default router;