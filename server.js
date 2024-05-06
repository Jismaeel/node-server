const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS middleware
app.use(cors({
    origin: ["https://themitchellsplaindrivingschoolassociation.site", "null"] // Removed quotes around "null"
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Nodemailer transporter setup for Outlook
let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

// Route to handle POST request to send email
app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body; // Assuming your request body contains these fields

    // Email content
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Error sending email' });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Email sent successfully' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
