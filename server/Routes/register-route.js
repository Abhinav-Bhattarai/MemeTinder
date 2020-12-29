import express from 'express';
import RegistrationModel from '../Models/register-model.js';
import jwt from 'jsonwebtoken';
import bcypt from 'bcrypt';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config()

const router = express.Router()

router.post('/', (req, res)=>{  
    const Username = req.body.Username;
    let Password = req.body.Password;
    const Confirm = req.body.Confirm;
    const Email = req.body.Email;
    const Gender = req.body.Gender;

    // backend validation cross-checking;
    if(Username.length >= 1 && Password.length >= 8 && Confirm === Password && Email.length >= 11 && Gender.length >= 4){
        const number_regex = /[0-9]/;
        if(number_regex.exec(Password) !== null){
            RegistrationModel.find().where('Username').equals(Username).then((response)=>{
                if(response.length === 0){

                    // hashing the user-password in salt-gen 10;
                    bcypt.hash(Password, 10, (err, hashed_data)=>{
                        if(!err){
                            Password = hashed_data
                            const Data = new RegistrationModel({
                                Username, Password, Email, Gender
                            })
                            Data.save().then((user_data)=>{
                                jwt.sign(user_data, process.env.JWT_AUTH_KEY, (err, token)=>{
                                    
                                        // sending mail asynchronously
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
                                            html: '<h1 style="margin: 10px auto; text-align: center;">Welcome to Meme Tinder</h1><div style="padding: 10px 2%; margin: 10px auto; font-size: 16px">Please confirm your Email to further continue with MemeTinder.</div><a href="https://localhost:3000" style="width: 95%; display:block; margin:10px auto; padding:18px 4%; background-color: #ff374e; color:#fff; font-size:20px; border: none;  border-radius: 10px; margin-top:30px; text-align: center;">Accept to Confirm</a>'
                                    
                                        }, (err, info)=>{})
                                        return res.json({data: user_data, token})
                                    
                                })
                            })
                        } 
                    })
                }else{
                    // excention
                    return res.json({error_type: 'Username', message: 'Username Already exists'})
                }
            })
        }
    }else{
        // exception
        return res.json({type: 'Bypassed', error: 'Fraudulant data'})
    }
})

export default router;