const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  status: { type: String, default: "PENDING" }
});

module.exports = mongoose.model("User", UserSchema);