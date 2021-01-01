import express from 'express';
import RegistrationModel from '../Models/register-model.js';
import UserModel from '../Models/user-model.js';

const router = express.Router();

router.delete('/', (req, res)=>{
    RegistrationModel.remove().then(()=>{
        UserModel.remove().then(()=>{
            return res.json({deleted: true});
        })
    })
})

export default router;