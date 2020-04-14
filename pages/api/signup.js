import initDb from "./db/db";
import shortid from "shortid";

import User from "./models/user";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  await initDb();
  if (req.method === "POST") {
    try {
      const { token } = req.body;
      if (token) {
        jwt.verify(token, process.env.JWT_PRESIGNUP, function(err, decoded) {
          console.log(err);
          if (err) {
            return res.status(401).json({
              error: "Expired link. Please sign up again"
            });
          }
          const { name, email, password } = jwt.decode(token);
          const username = shortid.generate();
          const profile = `${process.env.DOMAIN}/profile/${username}`;

          const user = new User({ name, email, password, profile, username });

          user.save((err, user) => {
            if (err) {
              return res.status(401).json({
                error: err
              });
            }
            return res.json({
              message: "Sign Up Success please sign in!!"
            });
          });
        });
      } else {
        return res
          .status(400)
          .json({ message: "Something went wrong. Try again later!!" });
      }
    } catch (err) {
      res.status(400).json({
        error: err
      });
    }
  }
};

export default signup;
