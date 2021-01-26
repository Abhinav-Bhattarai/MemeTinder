import express from 'express';
import RegistrationModel from '../Models/register-model.js';
import redis from 'redis';
import NotificationCache from '../Middleware/redis-notification-cache.js';
import jwt from 'jsonwebtoken';

const cache = redis.createClient();
const router = express.Router();

router.get('/:Username/:token', NotificationCache, (req, res)=>{
    const token = req.params.token;
    const Username = req.params.Username;
    RegistrationModel.findOne({Username}).exec().then((response)=>{
        if(response){
            jwt.verify(token, process.env.JWT_AUTH_KEY, (err, verification) => {
                if(!err){
                    cache.set(`notification/${Username}`, JSON.stringify(response.Notification), ()=>{
                        return res.json(response.Notification);
                    })
                }else{
                    return res.json({access_denied: true});
                }
            })
        }
    })
})

router.put('/', (req, res)=>{
    const Sender = req.body.Sender;
    const ProfilePicture = req.body.ProfilePicture;
    const Username = req.body.Username;
    RegistrationModel.findOne({Username: Username}).exec().then((response)=>{
        if(response){
            const dummy = [...response.Notification];
            dummy.push({sender: Sender, ProfilePicture});
            response.Notification = dummy;
            cache.set(`notification/${Username}`, JSON.stringify(dummy), ()=>{
                response.save().then(()=>{
                    return res.json({ notification_added: true });
                })     
            })
        }else{
            return res.json({ no_username: true });
        }
    }).catch(()=>{
        return res.json({error: true});
    })
})

export default router;