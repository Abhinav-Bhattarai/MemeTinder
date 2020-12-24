import express from 'express';
import RegistrationModel from '../Models/register-model.js';
import jwt from 'jsonwebtoken';
import bcypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config()

const router = express.Router()

router.post('/', (req, res)=>{
    const Username = req.body.Username
    const Password = req.body.Password
    const Confirm = req.body.Confirm
    const Email = req.body.Email
    const Gender = req.body.Gender

    if(Username.length >= 1 && Password.length >= 8 && Confirm === Password && Email.length >= 11 && Gender.length >= 4){
        const number_regex = /[0-9]/
        if(number_regex.exec(Password) !== null){
            RegistrationModel.find().where('Username').equals(Username).then((response)=>{
                if(response.length === 0){
                    bcypt.hash(Password, 10, (err, hashed_data)=>{
                        if(!err){
                            Password = hashed_data
                            const Data = new RegistrationModel({
                                Username, Password, Email, Gender
                            })
                            Data.save().then((user_data)=>{
                                jwt.sign(user_data, process.env.JWT_AUTH_KEY, (err, token)=>{
                                    if(!err){
                                        return res.json({data: user_data, token})
                                    }
                                })
                            })
                        } 
                    })
                }else{
                    return res.json({type: 'Username_redundant', error: 'Username Already exists'})
                }
            })
        }
    }else{
        return res.json({type: 'Bypassed', error: 'Fraudulant data'})
    }
})

export default router