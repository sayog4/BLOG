import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      index: true,
      lowercase: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    profile: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    photo: {
      data: Buffer,
      contentType: String
    },
    resetPasswordLink: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);
// check pw while signin
userSchema.methods = {
  authenticate: async function(plainPw) {
    const isMatch = await bcrypt.compare(plainPw, this.password);

    return isMatch;
  }
};
// hashing password

userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

export default mongoose.models.User || mongoose.model("User", userSchema);
