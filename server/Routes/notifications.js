import express from 'express';
import RegistrationModel from '../Models/register-model.js';

const router = express.Router();

router.put('/', (req, res)=>{
    const Sender = req.body.Sender;
    const ProfilePicture = req.body.ProfilePicture;
    const Username = req.body.Username;
    RegistrationModel.findOne({Username: Username}).exec().then((response)=>{
        if(response){
            const dummy = [...response.Notification];
            dummy.push({Sender, ProfilePicture});
            response.Notification = dummy;
            response.save().then(()=>{
                return res.json({ notification_added: true });
            })
        }else{
            return res.json({ no_username: true });
        }
    })
})

export default router;