const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const PORT = 4000;

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const startT = Date.now();
app.use("/health", (_, res) => res.json({ time: Date.now() - startT }));

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
  console.log(`server is running localhost:${PORT}`);
});
