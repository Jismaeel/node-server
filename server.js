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
app.use(cors({
  origin: "https://themitchellsplaindrivingschoolassociation.site",
  methods: ['GET', 'POST'], // Allow these methods
}));

// Endpoint to handle form contact submission
app.post("/submit-contact", async (req, res) => {
  const { name, email, message } = req.body;

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
    text: `\nName: ${name} \nEmail: ${email}\nMessage: ${message}`,
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
  const { name, surname, email, school1, number1, area } = req.body;

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
      Name: ${name} ${surname}
      Email: ${email}
      Driving School: ${school1}
      Phone Number: ${number1}
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

// Endpoint to handle Skylas bookings form submission
app.post("/submit-bookingskylas", async (req, res) => {
  const { name, surname, email, number1, courseOption, packageOption, carHire, selectedDate } = req.body;

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

  // Construct email message
  const mailOptions = {
    from: "mpdsa2024@outlook.com", // Sender's email address
    to: "infoatijdesigns@gmail.com", // Recipient's email address
    subject: "New Booking Form Submission",
    text: `
    Name: ${data.name} ${data.surname}
    Email: ${data.email}
    Phone Number: ${data.number1}
    Course Option: ${data.courseOption}
    Package Option: ${data.packageOption}
    Car Hire (North): ${data.carHire.north ? 'Yes' : 'No'}
    Car Hire (South): ${data.carHire.south ? 'Yes' : 'No'}
    Selected Date: ${data.selectedDate}
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
