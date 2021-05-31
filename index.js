require("dotenv").config();

const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

let mailOptions = {
  from: "bmuday971@gmail.com",
  to: "bmuday@live.fr",
  subject: "Second Testing of Nodemailer",
  text: "It works a second time!",
};

transporter
  .sendMail(mailOptions)
  .then((res) => {
    console.log("Email sent!");
  })
  .catch((err) => {
    console.log("Error occured: ", err);
  });

/* transporter.sendMail(mailOptions, (err, data) => {
  if (err) {
    console.log("Error occured: ", err);
  } else {
    console.log("Email sent!");
  }
}); */
