import express from 'express';
import UserModel from '../Models/user-model.js';

const router = express.Router();

router.get('/:Username', (req, res)=>{
    const Username = req.params.Username ;
    UserModel.find().where("Username").equals(Username).then((response)=>{
        if(response.length === 1){
            const data = response[0].Matches;
            if(data.length >= 1){
                return res.json({ data })
            }else{
                return res.json({no_matches: true});
            }
        }else{
            return res.json({error_type: 'Username', message: 'Wrong Username'});
        }
    }).catch(()=>{
        return res.json({error: true});
    })
});

router.post('/', (req, res)=>{
    const FriendName = req.body.FriendName;
    const YourName = req.body.YourName;
    const FriendProfilePic = req.body.FriendProfilePic;
    const YourProfilePic = req.body.YourProfilePic;
    UserModel.findOne({Username: YourName}).exec().then((sender_profile)=>{
        if(sender_profile){
            sender_profile.Matches.push({ username: FriendName, Profile_Picture: FriendProfilePic })
            sender_profile.save().then(()=>{
            UserModel.findOne({ Username: FriendName }).exec().then((receiver_profile)=>{
                if(receiver_profile){
                    receiver_profile.Matches.push({ username: YourName, Profile_Picture: YourProfilePic })
                    receiver_profile.save().then(()=>{
                        return res.json({'matched': true});
                    })
                }else{
                    return res.json({not_added_to_matches: true});
                }
            })
        })
        }else{
            return res.json({not_added_to_matches: true});
        }
    }).catch(()=>{
        return res.json({error: true});
    })
});

export default router;