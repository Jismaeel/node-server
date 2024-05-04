const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require("cors");

const app = express();
const port = 4000;

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS configuration for specific pages
app.use(cors({
  origin: ["https://themitchellsplaindrivingschoolassociation.site/index.html", "https://themitchellsplaindrivingschoolassociation.site/Member.html"]
}));

// POST route to handle contact form submission
app.post('/submit-contact-form', (req, res) => {
    // Extract contact form data
    const { name, email, message } = req.body;

    // Create a transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: "mpdsa2024@outlook.com", // Sender's address
            pass: "Liverpool77#", // Sender's password
        },
    });

    // Email content for contact form
    let mailOptions = {
        from: "mpdsa2024@outlook.com",
        to: "infoatijdesigns@gmail.com",
        subject: 'New Message from Contact Form',
        html: `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Message: ${message}</p>
        `
    };

    // Send mail for contact form
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

// POST route to handle membership form submission
app.post('/submit-membership-form', (req, res) => {
    // Extract membership form data
    const { name, surname, email, Drivingschool, phone, area } = req.body;

    // Create a transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: "mpdsa2024@outlook.com", // Sender's address
            pass: "Liverpool77#", // Sender's password
        },
    });

    // Email content for membership form
    let mailOptions = {
        from: "mpdsa2024@outlook.com",
        to: "infoatijdesigns@gmail.com",
        subject: 'Membership Application',
        html: `
            <p>Name: ${name}</p>
            <p>Surname: ${surname}</p>
            <p>Email: ${email}</p>
            <p>Driving School: ${Drivingschool}</p>
            <p>Phone: ${phone}</p>
            <p>Area: ${area}</p>
        `
    };

    // Send mail for membership form
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
