const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/////////////////////////
//REGISTER
router.get("/message", async (req, res) => {
    try{
            const repObject = {
                "message": "The wild wood"
            }
            
      res.status(200).json(repObject);
    } catch (err) {
        console.log(err.code);
       if(err.code === 11000){
        return res.status(409).json(err);
       }else {
        return res.status(500).json(err);
      }
    }
});


/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
module.exports = router;