const mongoose = require("mongoose");

const DialogueSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    solved: { type: Boolean, default: false},
    initmessage: { type: String },
    dialoguecode: { type: String },
  },
  { timestamps: true }
);
////////////////////////////////////////////////////////
module.exports = mongoose.model("Dialogue", DialogueSchema);