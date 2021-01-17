import redis from 'redis';

const cache = redis.createClient();

const NotificationCache = (req, res, next)=>{
    cache.get(`notification/${req.params.Username}`, (err, reply)=>{
        if(!err && reply){
            const data = JSON.parse(reply);
            return res.json(data);
        }
        next();
    });
}

export default NotificationCache;