
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = 1010;

// Middleware
app.use(
  cors({
    origin: ["https://mpdsa.online", "http://localhost:5173"],
    methods: ["GET", "POST"],
  })
);
app.use(bodyParser.json());

// Email Transporter Setup
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: "mpdsa@mpdsa.online",
    pass: "Angeline77#",
  },
});

// Common function to send email
const sendEmail = async (mailOptions, res) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
};


// Contact Form Submission
app.post("/submit-contact", async (req, res) => {
  const { firstname, email, message } = req.body;

  const mailOptions = {
    from: "mpdsa@mpdsa.online",
    to: "admin.admin@mpdsa.online",
    subject: "New Message from Contact Form",
    text: `Name: ${firstname}\nEmail: ${email}\nMessage: ${message}`,
  };

  sendEmail(mailOptions, res);
});

// Membership Form Submission
app.post("/submit-membership", async (req, res) => {
  const {
    firstname,
    surname,
    email,
    drivingschool,
    phonenumber,
    area,
    termsAccepted,
  } = req.body;

  const mailOptions = {
    from: "mpdsa@mpdsa.online",
    to: "admin.admin@mpdsa.online",
    subject: "New Membership Application",
    text: `
      Name: ${firstname} ${surname}
      Email: ${email}
      Driving School: ${drivingschool}
      Phone Number: ${phonenumber}
      Area: ${area}
      Terms Accepted: ${termsAccepted}
    `,
  };

  sendEmail(mailOptions, res);
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
