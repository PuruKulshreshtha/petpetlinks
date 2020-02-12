import uniqueValidator from "mongoose-unique-validator";
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Category = new Schema({
  category: { type: String, required: true, unique: true },
  category_pic: String
});
Category.plugin(uniqueValidator);
module.exports = mongoose.model("Category", Category);
