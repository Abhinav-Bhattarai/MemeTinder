// import express from "express";
// import redis from 'redis';
// import RegistrationModel from "../Models/register-model.js";

// const caches = redis.createClient();
// const router = express.Router();

// router.put("/:Username", (req, res) => {

//   RegistrationModel.findOne({Username: req.params.Username}).exec().then((response)=>{
//     if(response){
//         const error = {error: true};
//         const ProfilePicture = req.body.ProfilePicture;
//         const Username = req.body.Username;
//         if(ProfilePicture && Username){
//             if(response.Username !== Username && Username.length >= 4){
//                 response.Username = Username;
//             }
//             if(response.ProfilePicture !== ProfilePicture && ProfilePicture.length >= 10){
//                 response.ProfilePicture = ProfilePicture;
//             }
//             caches.del(`profile-pic/${req.params.Username}`, ()=>{
//                 caches.set(`profile-pic/${req.body.Username}`, response.ProfilePicture, ()=>{
//                     response.save().then(()=>{
//                         return res.json({updated: true});
//                     }).catch(()=>{
//                         return res.json(error)
//                     })
//                 })
//             })
//         }else{
//             return res.json(error)
//         }
//     }
//   })

// });

// export default router;