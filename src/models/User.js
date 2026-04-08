const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema, 'users');