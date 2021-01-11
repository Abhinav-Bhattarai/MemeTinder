import express from 'express';
import RegistrationModel from '../Models/register-model.js';

const router = express.Router();

router.put('/', (req, res)=>{
    const MyName = req.body.MyName;
    const ReactedPersonName = req.body.ReactedPersonName;
    RegistrationModel.findOne({Username: MyName}).exec().then((response)=>{
        const dummy = [...response.ReactedProfiles];
        dummy.push(ReactedPersonName);
        response.ReactedProfiles = dummy.sort();
        response.save().then(()=>{
            return res.json({reacted: true});
        })
    })
});

export default router;