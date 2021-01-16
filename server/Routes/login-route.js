import express from 'express';
import bcrypt from 'bcrypt';
import RegisterModel from '../Models/register-model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router()

router.post('/', (req, res)=>{
    const Username = req.body.Username;
    const Password = req.body.Password;

    console.log(true);
    // checking for the existance of the user provided credential;
    RegisterModel.find().where('Username').equals(Username).then((response)=>{
        if(response.length === 1){
            // bcrypt comparing as the password are hashed
            bcrypt.compare(Password, response[0].Password, (err, state)=>{
                if(!err){
                    if(state){
                        const data = response[0]
                        jwt.sign(data.toJSON(), process.env.JWT_AUTH_KEY, {expiresIn: 86400}, (error, auth_token)=>{
                            if(!error) return res.json({data: response[0], token: auth_token})
                        })
                    }else{
                        return res.json({error_type: 'Password', message: 'Password Do not match'})
                    }
                }
            })
        }else{
            // excention
            return res.json({error_type: 'Username', message: 'No such Username registered'})
        }
    }).catch(()=>{
        return res.json({error_type: 'Username', message: 'No such Username registered'})
    })

})

export default router