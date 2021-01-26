import express from 'express';
import UserModel from '../Models/user-model.js';
import redis from 'redis';
import MatchCache from '../Middleware/redis-match-cache.js';
import jwt from 'jsonwebtoken';

const cache = redis.createClient();
const router = express.Router();

router.get('/:Username/:token', MatchCache, (req, res)=>{
    const Username = req.params.Username ;
    const Token = req.params.token;
    UserModel.find().where("Username").equals(Username).then((response)=>{
        if(response.length === 1){
            const data = response[0].Matches;
            if(data.length >= 1){
                jwt.verify(Token, process.env.JWT_AUTH_KEY, (err, verification) => {
                    if(!err){
                        cache.set(`matches/${Username}`, JSON.stringify(data), ()=>{
                            return res.json(data);
                        });
                    }else{
                        return res.json({access_denied: true});
                    }
                })
            }else{
                cache.set(`matches/${Username}`, JSON.stringify({no_matches: true}), ()=>{
                    return res.json({no_matches: true});
                }) 
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
            const match_data = [...sender_profile.Matches];
            match_data.push({ username: FriendName, Profile_Picture: FriendProfilePic,  LastInteraction: Date.now(), Messages: [] });
            sender_profile.Matches = match_data
            sender_profile.save().then(()=>{
            UserModel.findOne({ Username: FriendName }).exec().then((receiver_profile)=>{
                if(receiver_profile){
                    const receiver_match_data = [...receiver_profile.Matches];
                    receiver_match_data.push({ username: YourName, Profile_Picture: YourProfilePic, LastInteraction: Date.now(), Messages: [] })
                    receiver_profile.Matches = receiver_match_data;
                    cache.set(`matches/${YourName}`, JSON.stringify(match_data), ()=>{
                        cache.set(`matches/${FriendName}`, JSON.stringify(receiver_match_data), ()=>{
                            receiver_profile.save().then(()=>{
                                return res.json({'matched': true});
                            })
                        })
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