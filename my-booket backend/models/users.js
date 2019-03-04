const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmFlag: { type: Number, default: 1 }
});

module.exports = mongoose.model("Users", usersSchema);
