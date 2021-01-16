import redis from 'redis';

const cache = redis.createClient();

const RequestCache = (req, res, next)=>{
    cache.get(`friend-req/${req.params.Username}`, (err, reply)=>{
        if(!err){
            if(reply){
                const data = JSON.parse(reply);
                return res.json(data);
            }
            next();
        }
    })
};

export default RequestCache;