const express = require("express");
const app = express();
const PORT = 8000;
const path = require("path");
const sendMail = require("./mail");

// Step 1
// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/email", (req, res) => {
  //TODO:
  const { email, subject, text } = req.body;
  console.log("Data: ", req.body);
  // send email
  sendMail(email, subject, text, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Internal server error!" });
    } else {
      res.json({ message: "Email sent!" });
    }
  });
});

// Server

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
