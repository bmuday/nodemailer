// Step 2

const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");
const mailgun = require("nodemailer-mailgun-transport");

const auth = {
  auth: {
    api_key: process.env.APIKEY,
    domain: process.env.DOMAIN,
  },
};

const transporter = nodemailer.createTransport(mailgun(auth));

// Step 3
const sendMail = (email, subject, text, cb) => {
  const mailOptions = {
    from: email,
    to: "bmuday@live.fr",
    subject: subject,
    text: text,
  };

  // Step 4
  transporter
    .sendMail(mailOptions)
    .then(() => {
      console.log("Email sent!");
    })
    .catch((err) => {
      console.log("Error occured: ", err);
    });
};

module.exports = sendMail;

/* 

// GMAIL
// Step 1
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Step 2
const mailOptions = {
  from: "bmuday971@gmail.com",
  to: "bmuday@live.fr",
  subject: "Testing of Nodemailer",
  text: "It works well!",
  attachments: [
    {
      filename: "profil.jfif",
      path: "./attachments/profil.jfif",
    },
  ],
};

// Step 3
transporter
  .sendMail(mailOptions)
  .then((res) => {
    console.log("Email sent!");
  })
  .catch((err) => {
    console.log("Error occured: ", err);
  });

*/
