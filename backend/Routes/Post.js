let router = require("express").Router();
//let timelineSchema = require("./schema_timeline");

import multer from "multer";

//let multer = require("multer");
//let categorySchema=require("./categorySchema");
import Posts from "../Api/Post";
//let Posts=require("../Api/Post");
let today = new Date();
let date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./Uploads");
  },
  filename: function(req, file, cb) {
    cb(null, date + file.originalname);
  }
});

let upload = multer({ storage: storage });
//----------------Profile Upload and new created
router.post("/timeline", upload.single("selectedFiles"), async (req, res) => {
  //console.log("File body", req.file);
  // console.log("request parameters in all posts", req.body);
  const data = {
    selectedFiles: date + req.file.originalname,

    categoryId: req.body.categoryId,
    author: req.body.author,
    title: req.body.title,
    featured: req.body.featured
  };
  let result = await Posts.uploadpost(data);
  res.send(result);
});

//---------------------------All posts  while page load react native and React
router.post("/allPosts", async (req, res) => {
  // console.log("res", req.body);
  let result = await Posts.allPosts(req.body);
  res.send(result);
});
//--------------------------Post count
router.post("/postCount", async (req, res) => {
  let result = await Posts.postCount();
  //console.log("Result of category save is ", result);
  res.send(result);
});

//---------------------------------Category
router.post("/category", async (req, res) => {
  //console.log("File body", req.body);
  const data = {
    category: req.body.cname.toUpperCase()
  };
  let cname = req.body.cname.toUpperCase();
  //console.log("data ,cname", data, cname);
  let result = await Posts.categoryInsert(data, cname);
  // console.log("Result of category save is ", result);
  res.send(result);
});

//----------------------For all category show While page load

router.get("/defaultCat", async (req, res) => {
  let result = await Posts.allCategory();
  res.send(result);
});

//---------------------for remove all categories
// router.get("/deletecat", function(req, res) {
//   categorySchema.remove({},function(err, re) {
//     console.log("delete catagery",re)
//    res.send(re);
//     })
//});
//---------------------singlePost
router.post("/singlePost", async (req, res) => {
  //console.log(req.body.id)
  const id = req.body.id;
  // console.log(id);
  let result = await Posts.singlePost(id);
  res.send(result);
});

//------------------Comment Save
router.post("/saveComment", async (req, res) => {
  const data = {
    comment: req.body.comment,
    userId: req.body.userId,
    postId: req.body.postId
  };
  // console.log(data);
  let result = await Posts.saveComment(data);
  res.send(result);
});

//------------------Like
router.post("/like", async (req, res) => {
  //console.log("fsdnj",req.body.dataUpadteToArray);
  let result = await Posts.like(req);
  res.send(result);
});
//---------------all comments

router.post("/all_Comments", async (req, res) => {
  //console.log("ROuter all comments",req.body);

  let result = await Posts.All_comments(req);
  res.send(result);
  //res.send(result);
});

router.get("/featured", async (req, res) => {
  //console.log("ROuter all comments",req.body);
  //console.log("Hello Featured");
  let result = await Posts.Featured();
  //console.log("Resuklt in router", result);
  res.send(result);
});
module.exports = router;
