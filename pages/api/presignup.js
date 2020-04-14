import initDb from "./db/db";
import { validateSignin } from "./validators/login";
import User from "./models/user";
import jwt from "jsonwebtoken";

import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.EMAIL_API_KEY);
const preSignUp = async (req, res) => {
  await initDb();
  if (req.method === "POST") {
    try {
      const { errors, isValid } = validateSignin(req.body);
      if (!isValid) return res.status(400).json({ errors });

      const { name, email, password } = req.body;
      const user = await User.findOne({ email: email.toLowerCase() });

      if (user) {
        errors.email = "Email already exists";
        return res.status(400).json({ errors });
      }
      const token = await jwt.sign(
        { name, email, password },
        process.env.JWT_PRESIGNUP,
        {
          expiresIn: "10m"
        }
      );
      const emailData = {
        to: email,
        from: process.env.EMAIL_FROM,
        subject: "Verify your account",
        html: `
          <p>Please, follow the link to verify your account</p>
          <p>${process.env.DOMAIN}/auth/account/verify/${token}</p>
          <hr />
          <p>This email contains sensitive information.</p>
        `
      };

      sgMail
        .send(emailData)
        .then(sent => {
          res.json({
            message:
              "Email has been sent to " +
              email +
              " follow the instruction to verify your account"
          });
        })
        .catch(err => res.json(err));
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
};

export default preSignUp;
