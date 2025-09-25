import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  password: { type: String, required: true }   // ✅ add password field
});

// 🔒 Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // only hash if changed
  this.password = await bcrypt.hash(this.password, 12); // cost factor = 12
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
