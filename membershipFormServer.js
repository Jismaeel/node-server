const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS configuration
app.use(
    cors({
      origin: "https://themitchellsplaindrivingschoolassociation.site/Member.html",
    })
  );

// POST route to handle form submission
app.post('/submit-form', (req, res) => {
    // Extract form data
    const { name, surname, email, Drivingschool, phone, area } = req.body;

  // Create a transporter with Gmail SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
  port: 587,
  secure: false, // true for 465, false for other ports
    auth: {
      user: "mpdsa2024@outlook.com", // Sender's address
      pass: "Liverpool77#", // Sender's password
    },
  });

    // Email content
    let mailOptions = {
        from: "mpdsa2024@outlook.com", // Sender's email address
    to: "infoatijdesigns@gmail.com", // Recipient's email address
        subject: 'Membership',
        html: `
            <p>Name: ${name}</p>
            <p>Surname: ${surname}</p>
            <p>Email: ${email}</p>
            <p>Driving School: ${Drivingschool}</p>
            <p>Phone: ${phone}</p>
            <p>Area: ${area}</p>
        `
    };

    // Send mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
