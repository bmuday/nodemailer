const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config({
  path: "../configs/config.env",
});

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

//OAuth2 configuration
const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});
const accessToken = oauth2Client.getAccessToken((err, token) => {
  if (err) {
    return;
  } else {
    return token;
  }
});

const authObject = {
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GMAIL_ID,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: accessToken,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

//Handles the User SignUp part
exports.registerController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //TODO: fix this, don't send error codes to client
    return res.status(401).json({
      validationError: errors.errors[0].msg,
    });
  } else {
    const { fname, lname, email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ error: "User already exists!" });
      } else {
        const token = jwt.sign(
          { fname, lname, email, password },
          process.env.JWT_KEY,
          { expiresIn: "10m" }
        );

        //Nodemailer configuration to send mails using gmail
        const smtpTransport = nodemailer.createTransport(authObject);
        const mailOptions = {
          from: process.env.GMAIL_ID,
          to: email,
          subject: "Eventz: Confirm Account",
          text: "Click on the link below to confirm your account for Eventz",
          html: `
                        <h1>This link is valid for <b>10 minutes</b> only!</h1>
                        <p>${process.env.CLIENT_URL}/user/activation/${token}</p>
                        <hr />
                        <p>This email may contains sensitive information</p>
                        <p>${process.env.CLIENT_URL}</p>
                        `,
        };

        const mailSentResponse = await smtpTransport.sendMail(mailOptions);

        if (mailSentResponse) {
          return res.status(200).json({
            message: "Verification email sent",
          });
        } else {
          return res.status(400).json({
            error: "Error sending verification email",
          });
        }
      }
    } catch (err) {
      console.log(err);
      return res
        .status(401)
        .json({ error: "Unexpected Email Error, Please Try again later!" });
    }
  }
};
