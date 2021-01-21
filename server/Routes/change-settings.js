import express from "express";
import redis from 'redis';
import RegistrationModel from "../Models/register-model";

const caches = redis.createClient();
const router = express.Router();

router.put("/:type/:Username", (req, res) => {
  const type = req.params.type;

  RegistrationModel.findOne({Username: req.params.Username}).exec().then((response)=>{
    if(response){
        const error = {error: true};
        if (type === "both") {
            const ProfilePicture = req.body.ProfilePicture;
            const Username = req.body.Username;
            if(ProfilePicture && Username){
                response.Username = Username;
                response.ProfilePicture = ProfilePicture;
            }else{
                return res.json(error)
            }
        } 
        
        else if (type === "profile") {
            const ProfilePicture = req.body.ProfilePicture;
            if(ProfilePicture){
                response.ProfilePicture = ProfilePicture;
            }else{
                return res.json(error);
            }
        } 
        
        else {
            const Username = req.body.Username;
            if(Username){
                response.Username = Username;
            }else{
                return res.json(error)
            }
        }

        if(type === "both" || type === "profile"){
            if(type === "both"){
                caches.del(`profile-pic/${req.params.Username}`, ()=>{
                    caches.set(`profile-pic/${req.body.Username}`, response.ProfilePicture, ()=>{
                        response.save().then(()=>{
                            return res.json({updated: true});
                        }).catch(()=>{
                            return res.json(error)
                        })
                    })
                })
            }else{
                caches.set(`profile-pic/${req.params.Username}`, response.ProfilePicture, ()=>{
                    response.save().then(()=>{
                        return res.json({updated: true});
                    }).catch(()=>{
                        return res.json(error)
                    })
                })
            }
        }else{
            response.save().then(()=>{
                return res.json({updated: true});
            }).catch(()=>{
                return res.json(error)
            })
        }

    }
  })

});

export default router;
