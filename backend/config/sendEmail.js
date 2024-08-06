const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'gadekarrahul804@gmail.com',
        pass: process.env.APP_PASSWORD,
      }
    });

    const mailOptions = {
      from: 'gadekarrahul804@gmail.com',
      to,
      subject,
      text
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
