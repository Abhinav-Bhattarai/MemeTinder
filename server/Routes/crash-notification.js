import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/:username', (req, res)=>{
    const Transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });

    Transporter.sendMail({
        sender: 'Abhinav Bhattarai',
        to: process.env.CRASH_NOTIFY_EMAIL,
        subject: 'WEBSITE CRASH',
        html: `<h1 style="margin: 10px auto; text-align: center;">CRASH</h1><div style="padding: 10px 2%; margin: 10px auto; font-size: 16px">${req.body.error}</div><a href="https://localhost:3000" style="width: 95%; display:block; margin:10px auto; padding:18px 4%; background-color: #ff374e; color:#fff; font-size:20px; border: none;  border-radius: 10px; margin-top:30px; text-align: center;">Look into Crash</a><div>Reported by: ${req.params.username}</div>`

    }, ()=>{})

    return res.json({crash_reported: true});
})

export default router;