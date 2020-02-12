let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let comment = new Schema({
   comment:{type:String,required:true},
   userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
   postId:{type:String,required:true},
   time:{type:Date,default:Date.now}
});

module.exports = mongoose.model('Comment' ,comment);
