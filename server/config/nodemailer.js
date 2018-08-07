const nodemailer = require("nodemailer");


//configure the nodemailer transporter
let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
});

module.exports = transporter;