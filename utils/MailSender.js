require('dotenv').config({path: __dirname+ '/.env'});

const MAIL_SETTINGS = {
    host: process.env.MAIL_HOST,
    service: 'gmail',
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  }
    
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport(MAIL_SETTINGS);
  
  module.exports = {
    sendMail: async (params) => {
        try {
          let info = await transporter.sendMail({
            from: MAIL_SETTINGS.auth.user,
            to: params.to, 
            subject: 'Hello ✔',
            html: `
            <div
              class="container"
              style="max-width: 90%; margin: auto; padding-top: 20px"
            >
              <h2>Welcome.</h2>
              <h4>You are officially In ✔</h4>
              <p style="margin-bottom: 30px;">Please enter the sign up OTP to get started</p>
              <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.OTP}</h1>
         </div>
          `,
          });
          return info;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
  }