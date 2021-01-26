import express from 'express';
import nodemailer from 'nodemailer';
import MobileRegistrationModel from '../Models/mobile-registrations.js';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

router.post('/', (req, res)=>{
    const Email = req.body.Email;
    MobileRegistrationModel.findOne({}).exec().then((response)=>{
        response.Email.push(Email);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        })
        transporter.sendMail({
            from: 'Abhinav Bhattarai',
            subject: 'PRE-REGISTRATION ALERT!!',
            to: Email,
            html: '<div style="padding: 10px 3%; font-weight: 500;">Thakyou for pre-registering to Light-Web. I will inform you as soon as I launch the native app for MemeTinder</div>'
        }, () => {});
        response.save().then(() => {
            return res.json({preregistered: true});
        })
    })
})

export default router;