const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Dialogue = require("../models/Dialogue");

/////////////////////////
//list messages
router.get("/dialoglisting", async (req, res) => {
    try{
         const repDial = await Dialogue.find();
            
      res.status(200).json(repDial);
    } catch (err) {
        console.log(err.code);
       if(err.code === 11000){
        return res.status(409).json(err);
       }else {
        return res.status(500).json(err);
      }
    }
});
//////////////////////////////////////////
router.post("/dialogmake", async (req, res) => {
  try{

    const messID    = req.query.mesid;
    const messCont  = req.query.messcont;
    const userId    = req.query.userId;

    const messDial = {
      "dialoguecode" : messID,
      "initmessage" : messCont,
      "solved": false,
      "userId" : userId
    }

    const dial = new Dialogue(messDial);
    const saveDialogue = await dial.save();
    res.status(200).json(saveDialogue);
  }catch(err){
    return res.status(500).json(err);
  }
});
////////////////////////

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
module.exports = router;