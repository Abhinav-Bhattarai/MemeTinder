import express from 'express';
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
        const main_sender_index = sender_data.Matches.findIndex((element)=>{
            return  element.username === Receiver;
        }) 
        // Adds the Message, changes the Messages to the Top and deletes prev index;
        sender_data.Matches[main_sender_index].Messages.push(data_for_sender);
        sender_data.Matches.unshift(sender_data.Matches[main_sender_index]);
        sender_data.Matches.splice(main_sender_index + 1, 1);

        sender_data.save().then(()=>{
            UserModel.findOne({Username: Receiver}).exec().then((receiver_data)=>{
                const data_for_receiver = {
                    data: Message,
                    self: false,
                    Date: DateTime
                }
                const main_receiver_index = receiver_data.Matches.findIndex((element)=>{
                    return  element.username === Sender;
                }) 
                receiver_data.Matches[main_receiver_index].Messages.push(data_for_receiver);
                receiver_data.save().then(()=>{
                    return res.json({ message_added: true });
                });
            })
        })
    })
});

export default router;