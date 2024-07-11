const nodemailer = require("nodemailer");

const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SENDER_MAIL,
    pass: process.env.SENDER_MAIL_PASSWORD,
  },
});

async function send(receiveEmail, subject = "", text = "", html = "") {
  const info = await transporter.sendMail({
    from: "REMP <remp.secure@gmail.com",
    to: receiveEmail,
    subject: subject,
    text: text,
    html: html,
  });
  console.log("Message sent: %s", info.messageId);
}

module.exports = {
  send,
};
