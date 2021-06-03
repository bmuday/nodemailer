const express = require("express");
const app = express();
const PORT = 8080;
const path = require("path");

// Step 1
// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/email", (req, res) => {
  //TODO:
  // send email
  console.log("Data: ", req.body);
  res.json({ message: "Message received!" });
});

// Step 2

const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");
const mailgun = require("nodemailer-mailgun-transport");

const auth = {
  auth: {
    api_key: "77f9b4df064c15fbcf616c7bfc874e76-1d8af1f4-7b69c2a4",
    domain: "sandboxa0b449abc1654c26854047df7f4bf1f7.mailgun.org",
  },
};

const transporter = nodemailer.createTransport(mailgun(auth));

// Step 3
const mailOptions = {
  from: "baptiste.muday@outlook.fr",
  to: "bmuday@live.fr",
  subject: "Testing of Nodemailer with Mailgun",
  text: "It works well!",
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

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
