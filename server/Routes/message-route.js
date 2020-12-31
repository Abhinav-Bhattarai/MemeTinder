import express, { Router } from 'express';
import UserModel from '../Models/user-model.js';

const router = express.Router();

router.put('/', (req, res)=>{
    const Message = req.body.Message;
    const Sender = req.body.Sender;
    const Receiver = req.body.Receiver;
    const DateTime = new Date(parseInt(Date.now())).toLocaleDateString();

    UserModel.findOne({Username: Sender}).exec().then((sender_data)=>{
        const data_for_sender = {
            data: Message,
            self: true,
            Date: DateTime
        };
        sender_data.Messages.push(data_for_sender);
        sender_data.save().then(()=>{
            UserModel.findOne({Username: Receiver}).exec().then((receiver_data)=>{
                const data_for_receiver = {
                    data: Message,
                    self: false,
                    Date: DateTime
                }
                receiver_data.Messages.push(data_for_receiver);
                receiver_data.save().then(()=>{
                    return res.json({ message_added: true });
                });
            })
        })
    })
});

export default Router;