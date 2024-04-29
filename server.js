

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// CORS configuration
app.use(cors({
  origin: 'https://msdsa-sever.glitch.me/' // Replace with your actual domain
}));

// Endpoint to handle form submission
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Create a transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jansenismaeel89@gmail.com', // Sender's Gmail address
            pass: 'Liverpool77#' // Sender's Gmail password
        }
    });

    // Mail options
    const mailOptions = {
        from: 'jansenismaeel89@gmail.com', // Sender's email address
        to: 'infoatijdesigns@gmail.com', // Recipient's email address
        subject: 'New Message from Contact Form',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
