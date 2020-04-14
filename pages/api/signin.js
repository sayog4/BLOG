import initDb from "./db/db";
import User from "./models/user";
import jwt from "jsonwebtoken";
import { validateSignin } from "./validators/signIn";

const Signin = async (req, res) => {
  if (req.method === "POST") {
    await initDb();
    try {
      const { errors, isValid } = validateSignin(req.body);
      if (!isValid) return res.status(400).send({ errors });
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(400).json({
          error: "User doesnot exist. Please sign up!"
        });
      }
      const matched = await user.authenticate(req.body.password);
      if (!matched) {
        return res.status(400).json({
          error: "Email and password do not match"
        });
      } else {
        const token = await jwt.sign(
          { _id: user._id },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d"
          }
        );

        // res.cookie("token", token, { expiresIn: "1d" });
        res.setHeader("Cookie", `token=${token}; HttpOnly; Secure`);

        const { _id, username, name, email } = user;
        res.json({
          token,
          user: { _id, username, name, email }
        });
      }
    } catch (err) {
      return res.status(400).json({
        error: "error iddsjg"
      });
    }
  }
};

export default Signin;
