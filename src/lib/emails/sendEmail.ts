import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER_EMAIL!,
    pass: process.env.NODEMAILER_USER_PASSWORD!,
  },
});

export function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  return transporter.sendMail({
    from: `Auth App ${process.env.NODEMAILER_USER_EMAIL!}`,
    to,
    subject,
    text,
    html,
  });
}
