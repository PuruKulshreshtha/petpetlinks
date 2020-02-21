import schema from "../Schema/user";

module.exports = {
  // signup: data => {
  //   return new Promise((res, rej) => {
  //     //console.log("Data is",data);
  //     schema.find({ email: data.email }, (err, result) => {
  //       if (result.length > 0) {
  //         schema.find({}, (err, resul) => {
  //           if (resul) {
  //             //console.log("Internal"+resul);
  //             let addStatusInResult = {
  //               dataFromDatabase: resul,
  //               status: "User Already Exists or not verified user"
  //             };
  //             res(addStatusInResult);
  //           } else {
  //             console.error(err);
  //           }
  //         });
  //        // //res.send("Already Exists")
  //        // console.log("Already Exists");
  //       } else {
  //         schema.create(data, (err, resu) => {
  //           if (resu.email == data.email) {
  //            // console.log("hdfsdhgdfhg",resu);

  //             let addStatusInResult = {
  //               dataFromDatabase: resu,
  //               status:
  //                 "User Created Successful Verification Link sent on your Email"
  //             };
  //             res(addStatusInResult);

  //             console.log("User Created Successful");
  //             //console.log(data);
  //           } else {
  //             console.error(err);
  //           }
  //         });
  //       }
  //     });
  //   });
  // },
  signup: data => {
    return new Promise((res, rej) => {
      //console.log("Data is",data);
      schema.create(data, (err, resu) => {
        if (err === null) {
          // console.log("hdfsdhgdfhg",resu);

          let addStatusInResult = {
            dataFromDatabase: resu,
            status:
              "User Created Successful Verification Link sent on your Email"
          };
          res(addStatusInResult);

          // console.log("User Created Successful");
          //console.log(data);
        } else {
          let addStatusInResult = {
            status: "User Already Exists or not verified user"
          };
          res(addStatusInResult);
        }
      });
    });
  },

  login: data => {
    return new Promise((res, rej) => {
      schema.find({ email: data.email, verified: true }, (err, result) => {
        if (result.length > 0) {
          if (result[0].password === data.password) {
            let addStatusInResult = {
              dataFromDatabase: result,
              status: "Login Success"
            };

            res(addStatusInResult);
          } else {
            let addStatusInResult = {
              dataFromDatabase: result,
              status: "Incorrect Password"
            };
            res(addStatusInResult);
          }
        } else {
          let addStatusInResult = {
            dataFromDatabase: result,
            status: "Invalid User or Not verified user"
          };
          res(addStatusInResult);
        }
      });
    });
  },
  forget: data => {
    return new Promise((res, rej) => {
      schema.find({ email: data.email, verified: true }, (err, result) => {
        if (result.length > 0) {
          let addStatusInResult = {
            dataFromDatabase: result,
            status: "Password Reterived"
          };
          res(addStatusInResult);
        } else {
          //console.log("else part");
          let addStatusInResult = {
            status: "Invalid User"
          };
          // console.log("else",addStatusInResult);
          res(addStatusInResult);
        }
      });
    });
  },
  changePassword: data => {
    // console.log(data);
    return new Promise((res, rej) => {
      schema.updateOne(
        { _id: data.userId },
        { password: data.newpassword },
        (err, result) => {
          //console.log("Rsult in api",result);
          if (result.nModified === 1 || result.ok === 1) {
            let addStatusInResult = {
              dataFromDatabase: result,
              status: "Password Reterived"
            };

            res(addStatusInResult);
          } else {
            let addStatusInResult = {
              status: "Invalid Link"
            };
            res(addStatusInResult);
          }
        }
      );
    });
  },
  verify: data => {
    return new Promise((res, rej) => {
      schema.updateOne(
        { _id: data.userId },
        { verified: true },
        (err, result) => {
          //console.log("Rsult in api",result);
          if (result.nModified === 1 && result.ok === 1) {
            let addStatusInResult = {
              dataFromDatabase: result,
              status: "verified"
            };

            res(addStatusInResult);
          } else {
            let addStatusInResult = {
              status: "Not verified"
            };
            res(addStatusInResult);
          }
        }
      );
    });
  },
  share: data => {
    //console.log("api data share ", data.body);
    return new Promise((res, rej) => {
      schema.find(
        { email: data.body.emailShare, verified: true },
        (err, response) => {
          if (response.length > 0) {
            let addStatusInResult = {
              status: "Shared"
            };
            res(addStatusInResult);
          } else {
            let addStatusInResult = {
              status: "Not Share because email not found in ppl account"
            };
            res(addStatusInResult);
          }
        }
      );
    });
  }
};
