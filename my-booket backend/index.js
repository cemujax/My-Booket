require("dotenv").config();

const express = require("express");
const history = require("connect-history-api-fallback");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.Promise = global.Promise;

// CONNECT TO MONGODB SERVER
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully connected to mongodb");
  })
  .catch(e => console.error(e));

const startT = Date.now();
app.get("/health", (_, res) => res.json({ time: Date.now() - startT }));
app.use("/api", require("./routes"));

app.use(history());
app.use(express.static(path.join(__dirname, "../my-booket frontend", "dist")));

app.use((req, res, next) => {
  res.status = 404;
  next(Error("not found"));
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(res.statusCode || 500);
  res.json({ error: err.message || "internal server error" });
});

app.listen(4000, () => {
  console.log(`server is running localhost:${port}`);
});
