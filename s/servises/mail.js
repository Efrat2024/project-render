const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: '37325922656@mby.co.il',
    pass: 'Student@264'
  }
});

function sendEmail(to, body) {
  const mailOptions = {
      from: ' תמר נופשים 📜 <37325922656@mby.co.il>',
      to: to,
      subject: "שלום! כאן תמר נופשים ",
      text: body
  };
  return transporter.sendMail(mailOptions);
}

module.exports = {
  sendEmail
};
