const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 4444,
  secure: false,
  auth: {
      user: '37325922656@mby.co.il',
      pass: 'Student@264'
  }
});

function sendEmail(from, body) {
  const mailOptions = {
      from: from,
      //' Daat Aaron 📜 <37325922656@mby.co.il>',
      to:'37325922656@mby.co.il',
      subject: "שלום תמר, יש לי שאלה בנוגע ל...",
      text: body
  };
  return transporter.sendMail(mailOptions);
}

module.exports = {
  sendEmail
};
