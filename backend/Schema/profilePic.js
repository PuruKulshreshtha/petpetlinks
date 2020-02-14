let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ProfilePic = new Schema({
  profilePic: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("ProfilePic", ProfilePic);
