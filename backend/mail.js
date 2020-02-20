const nodemailer = require("nodemailer");
import { Email, Password } from "./credential";
const sendMail = async data => {
  // console.log("data in mail", data);

  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: Email,
      pass: Password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"purukul@gmail.com', // sender address
    to: data.email,
    subject: data.subject,
    text: data.text
    // html: "<h3>Hello Dear,</h3>"+data.dataFromDatabase[0].username+"<h3>Your password is---</h3>"+data.dataFromDatabase[0].password // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

//main().catch(console.error);
export default sendMail;
