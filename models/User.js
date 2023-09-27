const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    surname: { type: String },
    email: { type: String },
    password: { type: String, unique: true, required: true },
    profilePic: { type: String, default: ""},
    profileid: { type: String, default: "0"},
    isAdmin: { type: Boolean, default: false },
    roles: { type: String, default: "patient"},
    bio: { type: String },
    phonenumber: { type: String, default: "" },
    gender: {type: String},
    profession: { type: String },
    extras: {type: Array },  //add location id and name
    ethnic:  { type: String},
    identity: { type: String, unique: true, required: true },
    approve: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);