let router = require("express").Router();
import multer from "multer";
import userSchema from "../Schema/user";
import { get } from "lodash";

let today = new Date();
let date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./ProfilePics");
  },
  filename: function(req, file, cb) {
    cb(null, date + "-" + file.originalname);
  }
});

let upload = multer({ storage: storage });
//------------------------------Profile pic in user pic

//----------------Profile Upload and new created
router.post("/profile", upload.single("profilePic"), (req, res) => {
  // console.log("File body", req.files);
  // console.log("request parameters in all posts", req.body);
  const data = {
    profilePic: date + "-" + req.file.originalname,
    userId: req.body.userId
  };
  //---------------profil in user data
  userSchema.updateOne(
    { _id: data.userId },
    { profilePic: data.profilePic },
    (err, resp) => {
      if (err === null) {
        res.send(data);
      }
      //console.log(resp);
    }
  );
});
// console.log(">>>>>>>>>>>>>>...hey Profiule pic", data);
//   profile.find({ userId: data.userId }, (err, resp) => {
//     if (resp.length > 0) {
//       profile.updateOne(
//         { userId: data.userId },
//         { profilePic: data.profilePic },
//         (err, resp) => {
//           if (resp) {
//             //console.log("Done");
//             res.send({ YES: "SUCESS" });
//           }
//         }
//       );
//       //console.log("Yes");
//     } else {
//       //console.log("NO");
//       profile.create(data, (err, resl) => {
//         if (resl.length > 0) {
//           res.send(resl);
//         }
//       });
//     }
//   });
// });
router.post("/default", (req, res) => {
  //console.log(req.body);
  userSchema.find({ _id: req.body.userId }, (err, resp) => {
    console.log(resp);
    if (resp.length > 0) {
      let image = {
        profilePic: get(resp[0], "profilePic", "123.jpg")
      };

      res.send(image);
    }
  });
  // profile.find({ userId: req.body.userId }, (err, resp) => {
  //   if (resp.length > 0) {
  //     //console.log(resp);
  //     let image = {
  //       profilePic: resp[0].profilePic
  //     };
  //     res.send(image);
  //   } else {
  //     let image = {
  //       profilePic: "123.jpg"
  //     };
  //     res.send(image);
  //   }
  // });
});
module.exports = router;
