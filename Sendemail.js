import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Resend } from "resend";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const resend = new Resend("YOUR_RESEND_API_KEY"); // paste your key here

// Send email route
app.post("/send-email", async (req, res) => {
  const { to, subject, html } = req.body;

  try {
    const data = await resend.emails.send({
      from: "Rewarder <onboarding@resend.dev>", // or your verified domain
      to,
      subject,
      html,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
});

app.listen(4000, () => console.log("✅ Server running on http://localhost:4000"));
