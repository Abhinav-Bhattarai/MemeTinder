import redis from 'redis';

const cache = redis.createClient();

const RequestCache = (req, res, next)=>{
    cache.get(`requests/${req.params.Username}`, (err, reply)=>{
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