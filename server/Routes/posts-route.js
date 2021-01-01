import express from 'express';
import RegistrationModel from '../Models/register-model.js';

const router = express.Router();

router.get('/:number', (req, res)=>{
    const number = req.params.number;
    RegistrationModel.find().skip(number).limit(20).then((response)=>{
        if(response.length >= 1){
            const main_data = [];
            let i = 0
            for(i of response){
                const data = {
                    ProfilePicture: i.ProfilePicture,
                    Username: i.Username,
                    MainPost: i.MainPost
                }
                main_data.push(data)
            }
            return res.json(main_data);
        }else{
            return res.json({ no_posts: true });
        }
    })
})

export default router;
