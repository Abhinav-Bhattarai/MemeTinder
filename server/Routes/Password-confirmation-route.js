import express from 'express';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import RegistrationModel from '../Models/register-model.js';

dotenv.config();

const router = express.Router();

router.get('/:Username', (req, res)=>{
    const Username = req.params.Username;
    RegistrationModel.find().where('Username').equals(Username).then((response)=>{
        if(response.length > 0){
            const Email = response[0].Email;
            const random_number = Math.ceil(Math.random() * 100000);
            jwt.sign({Email, number: random_number}, process.env.JWT_PASS_KEY, {expiresIn: 60*3}, (err, pass_token)=>{
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
        }else{
            return res.json({error_type: 'Username', error: 'Username not found'});
        }
    }).catch(()=>{
        return res.json({error_type: 'Username', error: 'Username not found'});
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