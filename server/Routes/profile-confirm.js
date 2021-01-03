import express from 'express';
import RegistrationModel from '../Models/register-model.js';

const router = express.Router();

router.post('/:Username', (req, res)=>{
    const ProfilePicture = req.body.ProfilePicture;
    const Username = req.params.Username;
    const MainPost = req.body.MainPost;
    RegistrationModel.findOne({Username}, (err, response)=>{
        if(!err){
            response.ProfilePicture = ProfilePicture;
            response.MainPost = MainPost;
            response.save().then(()=>{
                return res.json({profile_added: true});
            })
        }
    })
})

export default router;