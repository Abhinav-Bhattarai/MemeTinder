import express from 'express';
import RegistrationModel from '../Models/register-model.js';

const router = express.Router();

router.get('/:number/:Username', (req, res)=>{
    const number = parseInt(req.params.number);
    const Username = req.params.Username;
    
    RegistrationModel.aggregate([
        {$match: {}},
        {$skip: number*20},
        {$limit: 20},
        {$sort: {Username: 1}}
    ]).then((response)=>{
        if(response.length >= 1){
            const main_data = [];
            let i = 0
            let my_index = null;

            for(i in response){
                if(response[i].ProfilePicture.length >= 1){
                    if(response[i].Username !== Username){
                        const data = {
                            ProfilePicture: response[i].ProfilePicture,
                            Username: response[i].Username,
                            MainPost: response[i].MainPost
                        }
                        main_data.push(data);
                    }else{
                        my_index = i;
                    }
                }
            }
            if(main_data.length >= 1 && my_index){
                const my_request_list = [...response[my_index].ReactedProfiles];

                if(my_request_list.length >= 1){
                    const dummy_list = [...main_data];
                    let deletion_num = 0;
                    let j = 0;
                    for(j in main_data){
                        let first_index = 0;
                        let last_index = my_request_list.length - 1;

                        while ( first_index <= last_index ){ 
                            // Find the mid index 
                            const mid_index = Math.floor((first_index + last_index) / 2);
                            const MidIndexUsername = my_request_list[mid_index]; 
                            const condition = Math.sign(MidIndexUsername.localeCompare(main_data[j].Username))
                            // If element is present at mid, return True 
                            
                            if (MidIndexUsername === main_data[j].Username){
                                dummy_list.splice(j - deletion_num, 1);
                                deletion_num ++
                                break;
                            }
                      
                            // Else look in left or right half accordingly 
                            else if (condition === -1){  
                                first_index = mid_index + 1; 
                            }
    
                            else{
                                last_index = mid_index - 1; 
                            }
                        } 
                    }
                    return res.json(dummy_list);
                }else{
                    return res.json(main_data);
                }
            }else{
                return res.json(main_data);
            }
        }else{
            return res.json({ no_posts: true });
        }
    }).catch(()=>{
        return res.json({error: true});
    })
})

export default router;
