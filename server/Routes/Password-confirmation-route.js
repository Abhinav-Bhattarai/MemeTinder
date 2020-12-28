import express from 'express';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get('/:Email', (req, res)=>{
    const Email = req.params.Email;
    const random_number = Math.ceil(Math.random() * 10000);
    jwt.sign({Email, number: random_number}, process.env.JWT_PASS_KEY, (err, pass_token)=>{
        if(!err){
            const Transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASS
                }
            })
    
            Transporter.sendMail({
                sender: 'Abhinav Bhattarai',
                to: Email,
                subject: 'LOGIN AUTHENTICATION',
                html: `<h1 style="margin: 10px auto; text-align: center;">Welcome to Meme Tinder</h1><div style="text-align: center">Yout Confirmation Number is:</div><h1 style="text-align:center; font-weight: 500">${random_number}</h1>`
            }, ()=>{})
    
            return res.json({pass_token})
        }
    })
})

router.post('/', (req, res)=>{
    const token = req.body.token;
    const number = req.body.number;
    jwt.verify(token, process.env.JWT_PASS_KEY, (err, response)=>{
        if(!err){
            if(parseInt(response.number) === parseInt(number)){
                return res.json({access: true})
            }else{
                return res.json({access: false})
            }
        }else{
            return res.json({error_msg: 'Auth token not matching'})
        }
    })
})

export default router;