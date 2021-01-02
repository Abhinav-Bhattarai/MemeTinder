import express from 'express';
import RegistrationModel from '../Models/register-model.js';

const router = express.Router();

router.get('/:Username', (req, res)=>{
    const Username = req.params.Username;
    RegistrationModel.findOne({ Username: Username }).exec().then((response)=>{
        const ProfilePicture = response.ProfilePicture;
        return res.json(ProfilePicture);
    })
})

export default router;