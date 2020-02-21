let router = require("express").Router();
let bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false });
import api from "../Api/User";
import config from "../config";
const { URL, ROUTES } = config;
//console.log("URL ", URL);
//let api=require("../Api/User");
import mail from "../mail";
//let mail=require("../mail");
//--------------------signUp Request
router.post("/signup", urlencodedParser, async (req, res) => {
  const data = req.body;
  //console.log("Hello ");
  //console.log("data", data);

  let result = await api.signup(data);
  //console.log("result is",result);
  if (
    result.status ===
    "User Created Successful Verification Link sent on your Email"
  ) {
    let Info_for_sendingmail = {
      text:
        "Hello Dear, " +
        result.dataFromDatabase.username +
        " Your verify link for ppl is " +
        URL +
        ROUTES.VERIFY +
        result.dataFromDatabase._id,
      email: result.dataFromDatabase.email,
      subject: "Your Verification  Link"
    };
    //console.log("text Info_for_sendingmail",Info_for_sendingmail);
    mail(Info_for_sendingmail);
    res.send(result);
  } else {
    // console.log("result", result);
    res.send(result);
  }
});

//-------------------login Request
router.post("/login", urlencodedParser, async (req, res) => {
  const data = req.body;

  let result = await api.login(data);
  // console.log("dadaadd", result);
  res.send(result);
});

//------------------------forget Pass
router.post("/forget", urlencodedParser, async (req, res) => {
  const data = req.body;
  // console.log(data);
  //mail();

  const result = await api.forget(data);
  //console.log("data from body is ",data);
  //console.log("data from result is ",result)
  if (result.status === "Password Reterived") {
    let Info_for_sendingmail = {
      text:
        "Hello Dear," +
        result.dataFromDatabase[0].username +
        "    Your password reset link for ppl is " +
        URL +
        ROUTES.CHANGE_PASSWORD +
        result.dataFromDatabase[0]._id,
      email: result.dataFromDatabase[0].email,
      subject: "Your Password Reset Link"
    };
    //console.log("Info_for_sendingmail",Info_for_sendingmail);
    mail(Info_for_sendingmail);
    let p = {
      status: "Password Reset Link Send on your Email"
    };
    res.send(p);
  } else {
    res.send(result);
  }
});

router.post("/changePassword", urlencodedParser, async (req, res) => {
  //console.log("data routes",req.body);
  const data = req.body;
  if (data.newpassword === data.confirmpassword) {
    let result = await api.changePassword(data);
    res.send(result);
  }
});

router.post("/verify", urlencodedParser, async (req, res) => {
  const data = req.body;
  let result = await api.verify(data);
  res.send(result);
});
router.post("/share", async (req, res) => {
  //console.log("req body ",req.body);
  let result = await api.share(req);
  //console.log("Result",result);
  if (result.status === "Shared") {
    let Info_for_sendingmail = {
      text:
        "Hello Dear," +
        req.body.name +
        " Share a post the link is " +
        URL +
        ROUTES.SHARE +
        req.body.id,
      email: req.body.emailShare,
      subject: "Post Shared by " + req.body.name
    };
    mail(Info_for_sendingmail);
    let info = {
      status: "shared"
    };
    res.send(info);
  } else {
    let info = {
      status: result.status
    };
    res.send(info);
  }
});

module.exports = router;
