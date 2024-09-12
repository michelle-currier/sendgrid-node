const express = require("express");
const sgMail = require("@sendgrid/mail");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(cors());
app.use(express.json());

app.post("/send-email", (req, res) => {
  const { from_name, email, telephone, message } = req.body;

  const emailContent = {
    to: "mcurrierdesigns@gmail.com",
    from: "mushel@gmail.com",
    subject: "Contact Form Submission",
    text: `You have a new message from ${from_name} (${email}, ${telephone}): ${message}`,
    html: `<h1>Message from ${from_name}</h1><p>Email: ${email}</p><p>Phone: ${telephone}</p><p>Message: ${message}</p>`,
  };

  sgMail
    .send(emailContent)
    .then(() => res.status(200).json({ success: true, message: "Email sent!" }))
    .catch((error) =>
      res.status(500).json({ success: false, message: error.message })
    );
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
