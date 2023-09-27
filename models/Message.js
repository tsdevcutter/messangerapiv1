const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    message: {type: String, required: true },
    anonymous: { type: Boolean, default: false},
    name: { type: String},
    email: { type: String},
    phonenumber: { type: String},
    messagecode: { type: String },
  },
  { timestamps: true }
);
////////////////////////////////////////////////////////
module.exports = mongoose.model("Message", MessageSchema);