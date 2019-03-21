const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userName: { type: String, required: true, default: "" },
  confirmFlag: { type: Number, default: 0 }
});

module.exports = mongoose.model("Users", usersSchema);
