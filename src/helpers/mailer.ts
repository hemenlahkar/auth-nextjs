import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click the link below to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }:</p>
             <p><a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "forgotpassword"}?token=${hashedToken}">Click here</a></p>
             <p>or copy and paste the following link into your browser:</p>
             <p>${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "forgotpassword"}?token=${hashedToken}</p>
             <p>This link will expire in 1 hour.</p>`,
    };

    await transport.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Error sending email: " + error);
  }
};
