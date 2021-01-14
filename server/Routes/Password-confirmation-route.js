import express from 'express';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import RegistrationModel from '../Models/register-model.js';

dotenv.config();

const router = express.Router();

router.get('/:Username', (req, res)=>{
    const Username = req.params.Username;

    // Checking for the user;
    RegistrationModel.find().where('Username').equals(Username).then((response)=>{
        if(response.length >= 1){
            const Email = response[0].Email;
            // assigning random 5 digit number for OTP email feature;
            const random_number = Math.ceil(Math.random() * 100000);

            // signing the info in jsonwebtoken;
            const data = {Email, number: random_number};
            
            jwt.sign(data, process.env.JWT_PASS_KEY, {expiresIn: 60*5}, (err, pass_token)=>{
                if(!err){
                    // sending mail via node mailer TLS;
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
            // exception
            return res.json({error_type: 'Username', error: 'Username not found'});
        }
    }).catch((err)=>{
        // excention
        return res.json({error_type: 'Username', error: 'Username not found'});
    })
})

router.post('/', (req, res)=>{
    const token = req.body.token;
    const number = req.body.number;
    jwt.verify(token, process.env.JWT_PASS_KEY, (err, response)=>{
        // return the access response if the value received matches with the Random number created in the server; 
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
});

router.put('/', (req, res)=>{
    const Username = req.body.Username;
    const Password = req.body.Password;
    const Confirm = req.body.Confirm;
    RegistrationModel.findOne({Username}).exec().then((response)=>{
        if(Password === Confirm && Password.length >= 8){
            const number_regex = /[0-9]/;
            if(number_regex.exec(Password) !== null){
                bcrypt.hash(Password, 10, (err, hashed_password)=>{
                    if(!err){
                        response.Password = hashed_password;
                        response.save().then(()=>{
                            return res.json({password_changed: true});
                        })
                    }else{
                        return res.json({password_changed: false});
                    }
                })
            }
        }
    })
})

export default router;