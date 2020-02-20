import uniqueValidator from "mongoose-unique-validator";
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let userData = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  termsCondition: Boolean,
  verified: { type: Boolean, default: false },
  createdOn: { type: Date, default: Date.now },
  profilePic: { type: String, default: "123.jpg" }
});
userData.plugin(uniqueValidator);
module.exports = mongoose.model("User", userData);
