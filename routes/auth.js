const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/////////////////////////
//REGISTER
router.post("/register", async (req, res) => {
 
    try{
      const newUser = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ).toString(),
        isAdmin: req.body.isAdmin,
        roles: req.body.roles,
        bio: req.body.bio,
        profilePic: "-",
        profileid: "0",
        phonenumber: req.body.phonenumber,
        profession: req.body.profession,
        extras: req.body.extras,
        identity : req.body.identity,
        gender: req.body.gender,
        approve: req.body.approve,
      });
      
      //console.log(newUser);
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (err) {
      console.log(err.code);
      if(err.code === 11000){
        return res.status(409).json(err);
      }else {
        return res.status(500).json(err);
      }
      
    }
});
///////////////////////////////////
//LOGIN
router.post("/login", async (req, res) => {
    try {
  
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(401).json("Wrong password or email!");
  
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
  
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

      if(originalPassword !== req.body.password ){
        return  res.status(401).json("Wrong password or email!");
      }
        
      //the adminn field is invalid
      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.SECRET_KEY,
        { expiresIn: "5d" }
      );
  
      const { password, ...info } = user._doc;
  
      res.status(200).json({ ...info, accessToken });
    } catch (err) {
      console.log("ERROR PAAA ");
      return res.status(500).json(err);
    }
});
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
module.exports = router;