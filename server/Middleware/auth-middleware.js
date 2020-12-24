import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config()

const AuthMiddleware = (req, res, next)=>{
    const auth = req.params.auth
    const username = req.params.auth
    jwt.sign(auth, process.env.JWT_AUTH_KEY, (err, respone)=>{
        if(err) return res.json({access_denied: true})
        else{
            if(JSON.stringify(response) !== "{}"){
                if(username === response.Username){
                    next()
                }
            }
        }
    })
}

export default AuthMiddleware;