import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./logger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

logger.info("Server initializing...");

app.get("/logs", (req, res) => {
  const key = req.query.key;

  if (key !== process.env.ADMIN_KEY) {
    return res.status(403).json({ message: "Forbidden" });
  }

  fs.readFile("logs.log", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Could not read logs" });
    }
    res.type("text/plain").send(data);
  });
});

app.post("/contact", async (req, res) => {
  logger.info("Contact endpoint hit!", { body: req.body });

  const { name, email, subject, message } = req.body;

  try {
    logger.info("Creating email transporter...");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    logger.info("Sending email...", {
      to: process.env.EMAIL_USER,
      from: email,
      subject
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `📩 ${subject} — from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    logger.info("Email sent successfully!");
    res.json({ message: "Message sent successfully!" });

  } catch (error) {
    logger.error("Error sending email!", {
      error: error.message,
      stack: error.stack,
    });

    res.status(500).json({ message: "Failed to send message" });
  }
});

app.listen(PORT, () => {
  logger.info(`SERVER IS RUNNING ON PORT ${PORT}`);
});