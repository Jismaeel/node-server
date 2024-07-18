const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = 1010;

// Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(bodyParser.json());

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    methods: ["GET", "POST"], // Allow these methods
  })
);

// Endpoint to handle form contact submission
app.post("/submit-contact", async (req, res) => {
  const { firstname, email, message } = req.body;

  // Create a transporter with Outlook SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
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
    subject: "New Message from Contact Form",
    text: `\nName: ${firstname} \nEmail: ${email}\nMessage: ${message}`,
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

// Endpoint to handle membership form submission
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

  // Create a transporter with Outlook SMTP
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
      Name: ${firstname} ${surname}
      Email: ${email}
      Driving School: ${drivingschool}
      Phone Number: ${phonenumber}
      Area: ${area}
      Terms: ${termsAccepted}
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

// Endpoint to handle Skylas bookings form submission
// Endpoint to handle Skylas bookings form submission
app.post("/submit-bookingskylas", (req, res) => {
  const { name, surname, email, number1, transmission, courseOption, packageOption, carHire, selectdate } = req.body;

  // Construct the car hire options text
  const carHireText = Object.keys(carHire).map(key => {
    return `${key.charAt(0).toUpperCase() + key.slice(1)}: ${carHire[key] ? 'Yes' : 'No'}`;
  }).join('\n');

  // Mail options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "infoatijdesigns@gmail.com",
    subject: "New Booking Form Submission",
    text: `
      Name: ${name} ${surname}
      Email: ${email}
      Phone Number: ${number1}
      Transmission: ${transmission}
      Course Option: ${courseOption}
      Package Option: ${packageOption}
      Car Hire:
      ${carHireText}
      Selected Date: ${selectdate}
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
