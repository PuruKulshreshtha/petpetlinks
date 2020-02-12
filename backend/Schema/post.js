let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let post = new Schema({
  selectedFiles: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  commentNo: { type: Number, default: 0 },
  time: { type: Date, default: Date.now },
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  featured: { type: Boolean, default: false }
});
module.exports = mongoose.model("uploadPost", post);
