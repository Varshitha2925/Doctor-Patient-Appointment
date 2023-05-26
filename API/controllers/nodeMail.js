const nodemailer = require("nodemailer");

// Function to send the email
const sendEmail = async (toEmail, subject, content) => {
  console.log(toEmail);
  try {
    // Create a transporter using your SMTP credentials
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "varshithareddy2925@gmail.com",
        pass: "v@rshith@",
      },
    });

    // Define the email options
    const mailOptions = {
      from: "varshithareddy2925@gmail.com",
      to: toEmail,
      subject: subject,
      text: content,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendEmail };
