import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
     if (req.method !== "POST") {
          return res.status(405).json({ message: "Only POST allowed!" });
     }

     try {
          const { name, email, message } = req.body;

          await resend.emails.send({
               from: "onboarding@resend.dev",
               to: "nishantdhupia18@gmail.com",
               subject: `New message from ${name}`,
               html: `
                    <p>Name: ${name}</p>
                    <p>Email: ${email}</p>
                    <p>Message: ${message}</p>
               `,
          });
          res.status(200).json({ message: "Email sent successfully!" });
     } catch (error) {
          console.error("Error sending email:", error);
          res.status(500).json({ message: "Error sending email!" });
     }
}