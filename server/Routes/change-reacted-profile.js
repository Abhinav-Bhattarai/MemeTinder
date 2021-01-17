import express from 'express';
import RegistrationModel from '../Models/register-model.js';
import redis from 'redis';
const cache = redis.createClient();

const router = express.Router();

router.put('/', (req, res)=>{
    const MyName = req.body.MyName;
    const ReactedPersonName = req.body.ReactedPersonName;
    RegistrationModel.findOne({Username: MyName}).exec().then((response)=>{
        const dummy = [...response.ReactedProfiles];
        dummy.push(ReactedPersonName);
        response.ReactedProfiles = dummy.sort();
        response.save().then(()=>{
            cache.del(`posts/${MyName}`, ()=>{
                return res.json({reacted: true});
            });
        })
    }).catch(()=>{
        return res.json({error: true});
    })
});

export default router;