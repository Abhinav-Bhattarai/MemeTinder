import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router()

router.post('/', (req, res)=>{
    // jwt token checking;
    const token = req.body.token;
    jwt.verify(token, process.env.JWT_AUTH_KEY, (err, response)=>{
        if(err) return res.json({access_denied: true})
        else{
            if(JSON.stringify(response) !== JSON.stringify({})){
                return res.json({data: response})
            }else{
                return res.json({access_denied: true})
            }
        }
    })
})

export default router;