import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,      
    pass: process.env.MAIL_PASS,   
  },
});

export async function sendOtpMail(toEmail:string, otp:string): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: `"HD-Notes" <${process.env.EMAIL}>`,
      to: toEmail,
      subject: "HD-Notes OTP",
      text: `Your OTP is ${otp}`,
      html: `<p>Your OTP is <b>${otp}</b></p>`,
    });
    return true;
  } catch (err) {
    console.error("error sending email"+err);
    return false;
  }
}