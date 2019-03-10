const mongoose = require("mongoose");

const timelineSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  text: { type: String }
});

const booketsSchema = new mongoose.Schema({
  isbn: { type: String, required: true },
  userId: { type: String, required: true },
  status: { type: Number, default: 0 },
  rate: { type: Number },
  comment: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date },
  timeline: [timelineSchema],

  title: { type: String, required: true },
  description: { type: String },
  author: { type: String },
  pubDate: { type: String },
  publisher: { type: String },
  link: { type: String },
  imageLink: { type: String }
});

module.exports = mongoose.model("Bookets", booketsSchema);
