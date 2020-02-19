import timelineSchema from "../Schema/post";
//var timelineSchema = require("../Schema/post");
import bodyParser from "body-parser";
import sizeOf from "image-size";
//var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//import multer from "multer"
//var multer = require("multer");
import categorySchema from "../Schema/category";
//var categorySchema=require("../Schema/category");
import commentSchema from "../Schema/comment";
//var commentSchema=require('../Schema/comment');
module.exports = {
  uploadpost: data => {
    return new Promise((res, rej) => {
      timelineSchema.create(data, (err, resu) => {
        if (resu) {
          //console.log("Result", resu);
          timelineSchema
            .find({ _id: resu._id })
            .populate("author")
            .populate({ path: "categoryId", model: "Category" })
            .then(resul => {
              //console.log("result");
              if (resul) {
                //console.log(">>>>>>>>>>>>>", resul);
                let addStatusInResult = {
                  dataFromDatabase: resul,
                  status: "Profile Inserted"
                };
                res(addStatusInResult);
              } else {
                let addStatusInResult = {
                  dataFromDatabase: resu,
                  status: "Error"
                };
                res(addStatusInResult);
              }
            });
        } else {
          console.error(err);
        }
      });
    });
  },
  postCount: data => {
    //console.log(">data in post api", data);
    return new Promise((res, rej) => {
      timelineSchema.countDocuments(data).then(response => {
        //console.log("Res ", response);
        res({ count: response });
      });
    });
  },

  allPosts: data => {
    return new Promise((res, rej) => {
      // console.log("data", data);

      let categoryId = {};
      if (data.categoryId === null) {
        categoryId = {};
        // console.log("notalllll ", categoryId);
      } else {
        categoryId = { categoryId: data.categoryId };
        //  console.log("Yess All", categoryId);
      }
      // console.log(">>>>", categoryId);
      //console.log(
      //   "hello----------------------------------------------------------------",
      //   data
      // );
      timelineSchema
        .find(categoryId)
        .populate({ path: "author", model: "User" })
        .populate({ path: "categoryId", model: "Category" })
        .skip(data.skipCount)
        .limit(data.limitCount)
        .sort({ time: -1 })
        .then(resul => {
          // console.log(err)
          //console.log("allpost",resul)
          if (resul) {
            //resul.author=author
            //console.log(resul.author.name);
            let arr = [...resul];
            for (var i = 0; i < arr.length; i++) {
              let val = arr[i];
              var dimensions = sizeOf(`Uploads/${val.selectedFiles}`);
              let dimension = {
                height: dimensions.height,
                width: dimensions.width
              };
              //arr[i].imageWidth = dimension;
              //console.log("DIM", dimension);
              let obj = JSON.parse(JSON.stringify(arr[i]));
              obj.dimensions = dimension;
              //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>", obj);
              arr[i] = obj;
            }

            //console.log("arr", arr);
            let addStatusInResult = {
              dataFromDatabase: arr,

              status: "Profile Inserted"
            };
            // console.log(".>>>>>>>>>", addStatusInResult.dataFromDatabase);
            res(addStatusInResult);
          }
        });
    });
  },
  // categoryInsert: (data, cname) => {
  //   return new Promise((res, rej) => {
  //     // console.log("data, cname in api", data, cname);
  //     categorySchema.find({ category: cname }, (err, resl) => {
  //       if (resl.length > 0) {
  //         categorySchema.find({}, (err, re) => {
  //           let addStatusInResult = {
  //             dataFromDatabase: re,
  //             status: "Category Already Exists"
  //           };
  //           res(addStatusInResult);
  //         });
  //       } else {
  //         categorySchema.create(data, (err, resu) => {
  //           // console.log("Reesult ", resu);
  //           if (resu) {
  //             categorySchema.find({}, (err, re) => {
  //               let addStatusInResult = {
  //                 dataFromDatabase: re,
  //                 status: "Category Inserted"
  //               };
  //               res(addStatusInResult);
  //             });
  //           } else {
  //             let addStatusInResult = {
  //               dataFromDatabase: resu,
  //               status: "Error"
  //             };
  //             res(addStatusInResult);
  //           }
  //         });
  //       }
  //     });
  //   });
  // },
  categoryInsert: (data, cname) => {
    return new Promise((res, rej) => {
      categorySchema.create(data, (err, resu) => {
        if (err === null) {
          let addStatusInResult = {
            dataFromDatabase: resu,
            status: "Category Inserted"
          };
          res(addStatusInResult);
        } else {
          let addStatusInResult = {
            dataFromDatabase: resu,
            status: "Category Already Exists"
          };
          res(addStatusInResult);
        }
      });
    });
  },
  //|| this.state.c_status === "Category Already Exists"
  allCategory: () => {
    return new Promise((res, rej) => {
      categorySchema.find({}, (err, re) => {
        if (re) {
          let addStatusInResult = {
            dataFromDatabase: re,
            status: "Category Inserted"
          };
          res(addStatusInResult);
        } else {
          console.error("Error In Default Category", err);
        }
      });
    });
  },
  singlePost: id => {
    return new Promise((res, rej) => {
      timelineSchema
        .find({ _id: id })
        .populate("author")
        .populate("categoryId")
        .then(result => {
          if (result.length > 0) {
            let arr = [...result];
            for (var i = 0; i < arr.length; i++) {
              let val = arr[i];
              var dimensions = sizeOf(`Uploads/${val.selectedFiles}`);
              let dimension = {
                height: dimensions.height,
                width: dimensions.width
              };
              //arr[i].imageWidth = dimension;
              //console.log("DIM", dimension);
              let obj = JSON.parse(JSON.stringify(arr[i]));
              obj.dimensions = dimension;
              //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>", obj);
              arr[i] = obj;
            }

            const data = {
              status: "ok",
              dataFromDatabase: arr
            };
            //console.log("result fetched",result);
            res(data);
          } else {
            console.error(err);
          }
        });
    });
  },
  saveComment: data => {
    return new Promise((res, rej) => {
      commentSchema.create(data, (err, result) => {
        if (err === null) {
          // console.log("comment save ", result);
          timelineSchema.updateOne(
            { _id: result.postId },
            { $inc: { commentNo: 1 } },
            (err, resu) => {
              if (err === null) {
                //console.log("NO error");
              }
            }
          );
          commentSchema
            .find({ _id: result._id })
            .populate("userId")
            .then(resp => {
              res(resp);
            });
          // res(result);
        } else {
          rej(err);
        }
      });

      // timelineSchema.updateOne({_id:data.postId},{$push:{comment:data.comments}},(err,resl)=>{
      //     if(err===null)
      //     {
      //       res(resl);
      //       //console.log("res",resl);
      //     }
      //     else{
      //       console.log("NO")
      //     }
      //   })
    });
  },
  All_comments: data => {
    //console.log("data",data.body.id);
    return new Promise((res, rej) => {
      commentSchema
        .find({ postId: data.body.id })
        .populate("userId")
        .then(resp => {
          //console.log("Rsspppppppp",res);
          const data = {
            status: "ok",
            dataFromDatabase: resp
          };
          res(data);
        });
    });
  },

  like: req => {
    return new Promise((res, rej) => {
      //console.log("hello");
      timelineSchema.find(
        { _id: req.body.id, like: { $in: [req.body.dataUpadteToArray] } },
        (err, data) => {
          //console.log("Data",data);
          if (data.length > 0) {
            //console.log("If")
            timelineSchema.updateOne(
              { _id: req.body.id },
              { $pull: { like: req.body.dataUpadteToArray } },
              (err, resl) => {
                if (err === null) {
                  timelineSchema.find({ _id: req.body.id }, (err, resp) => {
                    if (resp.length > 0) {
                      res(resp);
                    }
                  });

                  //console.log("res",resl);
                } else {
                  console.log("NO");
                }
              }
            );
          } else {
            //console.log("Else");
            timelineSchema.updateOne(
              { _id: req.body.id },
              { $push: { like: req.body.dataUpadteToArray } },
              (err, resl) => {
                if (err === null) {
                  timelineSchema.find({ _id: req.body.id }, (err, reslt) => {
                    if (reslt.length > 0) {
                      res(reslt);
                    }
                  });

                  //console.log("res",resl);
                } else {
                  console.log("NO");
                }
              }
            );
          }
        }
      );
    });
  },
  Featured: () => {
    return new Promise((res, rej) => {
      timelineSchema
        .find({ featured: true })
        .sort({ time: -1 })
        .limit(3)
        .populate({ path: "author", model: "User" })
        .populate({ path: "categoryId", model: "Category" })
        .then(response => {
          //console.log("Respon in featured", response);
          res(response);
        });
    });
  }
};
