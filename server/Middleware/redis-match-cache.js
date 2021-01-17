import redis from 'redis';

const cache = redis.createClient();


const MatchCache = (req, res, next)=>{

    cache.get(`matches/${req.params.Username}`, (err, reply)=>{
        if(!err){
            if(reply){
                const data = JSON.parse(reply);
                return res.json(data);
            }
            next();
        }
    })
}

export default MatchCache;