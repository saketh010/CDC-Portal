import nodemailer from "nodemailer";
import User from "../../models/User";

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
    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    // Email content
    const mailOptions = {
      from: `"Career Development Cell" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Job Application Confirmation: ${job.title}`,
      html: `
        <p>Dear Student,</p>
        <p>You have successfully applied for the job <strong>${
          job.title
        }</strong> at <strong>${job.company}</strong>.</p>
        <p>Here are the details of the job you applied for:</p>
        <ul>
          <li><strong>Location:</strong> ${job.location}</li>
          <li><strong>Stipend:</strong> ${job.stipend || "N/A"}</li>
          <li><strong>Duration:</strong> ${job.duration}</li>
          <li><strong>OA Date:</strong> ${new Date(
            job.oaDate
          ).toLocaleDateString()}</li>
          <li><strong>Interview Date:</strong> ${new Date(
            job.interviewDate
          ).toLocaleDateString()}</li>
        </ul>
        <p>Best regards,<br/>Career Development Cell</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email", error });
  }
}
