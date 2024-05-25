const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// CORS configuration
app.use(
  cors({
    origin: "https://themitchellsplaindrivingschoolassociation.site",
    methods: ['GET', 'POST'], // Allow these methods
  })
);

// POST route for form submission
app.post('/submit', async (req, res) => {
    const { fullname, contact, email, address, courseOption, packageOption, carHire, selectedDate } = req.body;

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

    // Construct email message
    const mailOptions = {
        from: 'mpdsa2024@outlook.com',
        to: 'infoatijdesigns@gmail.com', // Change this to the recipient's email address
        subject: 'New Booking Form Submission',
        html: `
            <p><strong>Full Name:</strong> ${fullname}</p>
            <p><strong>Contact Number:</strong> ${contact}</p>
            <p><strong>Email Address:</strong> ${email}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Course Option:</strong> ${courseOption}</p>
            <p><strong>Package Option:</strong> ${packageOption}</p>
            <p><strong>Car Hire:</strong> ${carHire ? 'Yes' : 'No'}</p>
            <p><strong>Selected Date:</strong> ${selectedDate}</p>
        `
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Form submitted successfully');
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

