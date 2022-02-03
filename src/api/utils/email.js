import NodeMailer from 'nodemailer';

const sendEmail = async (email, name) => {
  try {
    const transporter = NodeMailer.createTransport({
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
      service: 'gmail'
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
      <h2>Hello ${name}</h2>
      <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
      <a href=${message}> Click here</a>
      </div>`,
    });
    console.log("Email sent sucessfully");
  } catch (error) {
    console.log("Email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;
