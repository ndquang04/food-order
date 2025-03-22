import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.RESEND_API) {
  console.log('Provide RESEND_API in side the .env file');
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = async ({sendTo, subject, html}) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_MAIL, // sender address
      to: sendTo,
      subject,
      text: 'Hello world?',
      html,
    });
  } catch (error) {
    console.log(error.message || error);
  }
};

export default sendEmail;
