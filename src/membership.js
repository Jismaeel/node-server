
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// CORS configuration
app.use(
  cors({
    origin: "https://themitchellsplaindrivingschoolassociation.site",
  })
);

// Endpoint to handle membership form submission
app.post("/submit-membership-form", (req, res) => {
  const { name, surname, email, school, number, area } = req.body;

  // Create a transporter with Gmail SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "mpdsa2024@outlook.com", // Sender's address
      pass: "Liverpool77#", // Sender's password
    },
  });

  // Mail options
  const mailOptions = {
    from: "mpdsa2024@outlook.com", // Sender's email address
    to: "infoatijdesigns@gmail.com", // Recipient's email address
    subject: "New Membership Application",
    text: `
      Name: ${name} ${surname}
      Email: ${email}
      Driving School: ${school}
      Phone Number: ${number}
      Area: ${area}
    `,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.sendStatus(200); // Send success response to client
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
