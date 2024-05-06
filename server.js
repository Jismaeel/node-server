// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors({
    origin: ["https://themitchellsplaindrivingschoolassociation.site", "null"] 
}));
app.use(bodyParser.urlencoded({ extended: true }));

// Create a nodemailer transporter using Outlook SMTP settings
let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});


// Route to handle email sending
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Define email options
    const mailOptions = {
        from: 'user: process.env.EMAIL_USER', // Update with your Outlook email
        to: 'infoatijdesigns@gmail.com', // Update with recipient email
        subject: 'Message from Contact Form',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.send('Email sent successfully');
        }
    });
});

// Export the app
module.exports = app;

// Start the server if not used as a module
if (!module.parent) {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

