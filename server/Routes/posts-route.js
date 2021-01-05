import express from 'express';
import RegistrationModel from '../Models/register-model.js';

const router = express.Router();

router.get('/:number/:Username', (req, res)=>{
    const number = parseInt(req.params.number);
    const Username = req.params.Username;
    
    RegistrationModel.aggregate([
        {$match: {}},
        {$skip: number*20},
        {$limit: 20}
    ]).then((response)=>{
        if(response.length >= 1){
            const main_data = [];
            let i = 0
            for(i of response){
                if(i.ProfilePicture.length >= 1){
                    if(i.Username !== Username){
                        const data = {
                            ProfilePicture: i.ProfilePicture,
                            Username: i.Username,
                            MainPost: i.MainPost
                        }
                        main_data.push(data);
                    }
                }
            }
            return res.json(main_data)
        }else{
            return res.json({ no_posts: true });
        }
    }).catch(()=>{})
})

export default router;
