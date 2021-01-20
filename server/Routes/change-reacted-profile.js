import express from "express";
import RegistrationModel from "../Models/register-model.js";
import redis from "redis";
const cache = redis.createClient();

const router = express.Router();

router.put("/", (req, res) => {
  const MyName = req.body.MyName;
  const ReactedPersonName = req.body.ReactedPersonName;
  RegistrationModel.findOne({
    Username: MyName,
  })
    .exec()
    .then((response) => {
      response.ReactedProfiles.push(ReactedPersonName);
      cache.del(`posts/${MyName}`, () => {
        response.save().then(() => {
          return res.json({
            reacted: true,
          });
        }); 
      });
    })
    .catch(() => {
      return res.json({
        error: true,
      });
    });
});

export default router;
