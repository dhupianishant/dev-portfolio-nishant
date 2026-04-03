import logger from "../utils/logger.js";
import { Resend } from "resend";
import DOMPurify from "dompurify";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
     logger.info({ method: req.method, url: req.url }, "contactMe API hit!");
     
     if (req.method !== "POST") {
          logger.warn("Rejected non-POST request.");
          return res.status(405).json({ message: "Only POST allowed!" });
     }

     if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
          logger.error("Missing required environment variables.");
          return res.status(500).json({ message: "Server configuration error!" });
          }

     try {
          const { name, email, message } = req.body;

          if (!name || !email || !message) {
               logger.warn("Validation failed: Missing fields.");
               return res.status(400).json({ message: "Name, email, and message are required!" });
          }

          if (name.length > 100 || email.length > 200 || message.length > 2000) {
               logger.warn("Validation failed: Field lengths exceeded.");
               return res.status(400).json({ message: "Input too long!" });
          }

          const cleanName = DOMPurify.sanitize(name);
          const cleanEmail = DOMPurify.sanitize(email);
          const cleanMessage = DOMPurify.sanitize(message);

          logger.info({ cleanName, cleanEmail}, "Sending email!");

          await resend.emails.send({
               from: "onboarding@resend.dev",
               to: process.env.CONTACT_EMAIL,
               subject: `New message from ${cleanName}`,
               html: `
                    <p><strong>Name:</strong> ${cleanName}</p>
                    <p><strong>Email:</strong> ${cleanEmail}</p>
                    <p><strong>Message:</strong> ${cleanMessage}</p>
               `,
          });
          
          logger.info("Email sent successfully!");
          res.status(200).json({ message: "Email sent successfully!" });
     } catch (error) {
          logger.error({ error }, "Error sending email!");
          res.status(500).json({ message: "Error sending email!" });
     }
}