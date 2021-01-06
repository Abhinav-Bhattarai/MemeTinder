import express from 'express';
import RegisterModel from '../Models/register-model.js';

const router = express.Router();

router.get('/:username', (req, res)=>{
    const Username = req.params.username;
    RegisterModel.find().where("Username").equals(Username).then((response)=>{
        if(response.length === 1){
            return res.json({data: response[0].Requests});
        }else{
            return res.json({no_requests: true})
        }
    })
})

router.put('/', (req, res)=>{
    const YourName = req.body.YourName;
    const FriendName = req.body.FriendName;
    const YourProfile = req.body.YourProfile;

    RegisterModel.findOne({ Username: FriendName }).exec().then((receiver)=>{
        const receiver_data = [...receiver.Requests];
        receiver_data.push({sender: YourName, ProfilePicture:  YourProfile});
        receiver.Requests = receiver_data;
        receiver.save().then(()=>{
            return res.json({ request_sent: true });
        })
    })

})

router.post('/', (req, res)=>{
    const FriendName = req.body.MyName;
    RegisterModel.findOne({ Username: FriendName }).exec().then((profile)=>{
        const Requests = [...profile.Requests];
        const index = Requests.findIndex((element)=>{
            return element.sender === FriendName;
        });
        Requests.splice(index, 1);
        profile.Requests = Requests;
        profile.save().then(()=>{
            return res.json({request_deleted: true});
        })
    })
})

export default router;