require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dipubhandari88@gmail.com",
    pass: process.env.GMAIL_PASSWORD,
  },
});

// let mailOptions = {
//   from: "dipubhandari88@gmail.com",
//   to: "venturesniraj@gmail.com",
//   subject: "Hello ✔",
//   text: "Hello world?",
// };

// const sendMail = transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });

module.exports = transporter;
