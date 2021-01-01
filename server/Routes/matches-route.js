import express from 'express';
import UserModel from '../Models/user-model.js';

const router = express.Router();

router.get('/:Username', (req, res)=>{
    const Username = req.params.Username ;
    UserModel.aggregate([
        // matching with the collection;
        {$match: {
            Username: Username
        }},

        // Opening Matches array in a collection mongo form;
        {$unwind: '$Matches'},

        // finally sorting the Matches array;
        {$sort: {
            'LastInteraction': -1
        }}

    ]).then((response)=>{
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
    })
});

router.post('/', (req, res)=>{
    const FriendName = req.body.FriendName;
    const YourName = req.body.YourName;
    const FriendProfilePic = req.body.FriendProfilePic;
    const YourProfilePic = req.body.YourProfilePic;
    UserModel.findOne({username: YourName}).exec().then((sender_profile)=>{
        sender_profile.Matches.push({ username: FriendName, Profile_Picture: FriendProfilePic })
        sender_profile.save().then(()=>{
            UserModel.findOne({ username: FriendName }).exec().then((receiver_profile)=>{
                receiver_profile.Matches.push({ username: YourName, Profile_Picture: YourProfilePic })
                receiver_profile.save().then(()=>{
                    return res.json({'matched': true});
                })
            })
        })
    })
});

router.put('/', (req, res)=>{
    const Username = req.body.Username;
    const Receiver = req.body.Receiver;

    UserModel.findOne({ Username: Username }).exec().then((data)=>{
        const Matches = [...data.Matches];
        const index = Matches.findIndex((match)=>{
            return match.username === Receiver;
        });
        Matches[index].LastInteraction = Date.now();
        data.Matches = Matches;
        data.save().then(()=>{
            UserModel.findOne({ Username: Usernmae }).exec().then((receiver_data)=>{
                const Matches_F = [...receiver_data.Matches];
                const index_F = Matches_F.findIndex((match)=>{
                    return match.username === Sender;
                });
                Matches_F[index_F].LastInteraction = Date.now();
                receiver_data.Matches = Matches_F;
                receiver_data.save().then(()=>{
                    return res.json({interaction_added: true});
                })
            })
        });
    });
    
})


export default router;