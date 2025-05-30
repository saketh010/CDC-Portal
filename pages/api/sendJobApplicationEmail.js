import nodemailer from "nodemailer";
import User from "../../models/User";
import { getJobApplicationEmailTemplate } from "../../utils/JobApplicationEmailTemplate";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { username, job } = req.body;
  console.log("Received username:", username);
  console.log("Received job:", job);

  const student = await User.findOne({ username: username });
  console.log("Retrieved email:", student.email);
  const email = student.email;    

  if (!email || !job) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Career Development Cell" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Job Application Confirmation: ${job.title}`,
      html: getJobApplicationEmailTemplate(job)
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email", error });
  }
}
