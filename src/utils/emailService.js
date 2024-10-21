const nodemailer = require('nodemailer');
const { CreateTransport } = nodemailer;

const sendGridTransport = {
    host: '(link unavailable)',
    port: 587,
    secure: false, // or 'STARTTLS'
    auth: {
      user: 'apikey',
      pass: 'YOUR_SENDGRID_API_KEY',
    },
    
  };
  
  const transporter = CreateTransport(sendGridTransport);
  
  const sendEmail = async (to, subject, body) => {
    try {
      const mailOptions = {
        from: 'YOUR_EMAIL_ADDRESS',
        to,
        subject,
        
        html: body,
      };
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  
  module.exports = { sendEmail };