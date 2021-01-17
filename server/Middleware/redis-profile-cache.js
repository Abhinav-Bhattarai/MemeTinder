import redis from 'redis';

const cache = redis.createClient();

const ProfilePictureCache = (req, res, next)=>{

    cache.get(`profile-pic/${req.params.Username}`, (err, reply)=>{
        if(!err){
            if(reply){
                return res.json(reply);
            }
            next();
        }
    })
}

export default ProfilePictureCache;