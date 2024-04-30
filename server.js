const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// CORS configuration
app.use(
  cors({
    origin: "https://themitchellsplaindrivingschoolassociation.site",
  })
);

// Endpoint to handle form submission
app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter with Gmail SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
  port: 587,
  secure: false, // true for 465, false for other ports
    auth: {
      user: "ismaeeljansen@hotmail.com", // Sender's address
      pass: "Liverpool77#", // Sender's password
    },
  });

  // Mail options
  const mailOptions = {
    from: "ismaeeljansen@hotmail.com", // Sender's email address
    to: "infoatijdesigns@gmail.com", // Recipient's email address
    subject: "New Message from Contact Form",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent successfully");
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
