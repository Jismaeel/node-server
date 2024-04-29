const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure body parser middleware to parse POST request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a Nodemailer transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jansenismaeel89@gmail.com', // your Gmail email address
    pass: 'Liverpool77#' // your Gmail password or application-specific password
  }
});

// Handle POST request to send email
app.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Set up email data
  const mailOptions = {
    from: email,
    to: 'infoatijdesigns@gamil.com', // Change this to your recipient email
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.sendStatus(200);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

