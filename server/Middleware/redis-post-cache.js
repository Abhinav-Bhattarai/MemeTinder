import redis from 'redis';

const cache = redis.createClient();

cache.on("connect", ()=>{
    console.log('connected to Redis');
});

const RedisPostCache = (req, res, next)=>{
    if(parseInt(req.params.number) === 0){
        cache.get(`posts/${req.params.Username}`, (err, reply)=>{
            if(reply){
                const data = JSON.parse(reply)
                return res.json(data);
            }
            next();
        })
    }else{
        next();
    }
}

export default RedisPostCache;