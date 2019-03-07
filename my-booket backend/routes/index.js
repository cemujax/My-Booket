const express = require("express");
const Users = require("../models/users");
const Bookets = require("../models/bookets");
const authService = require("../service/auth");
const router = express.Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const resUser = await Users.findOne({ email, password });

  if (!resUser) return res.status(401).json({ error: "로그인 실패" });
  const token = authService.signToken(resUser.id);
  const { userName, confirmFlag } = resUser;
  const user = {
    email,
    userName,
    confirmFlag
  };
  res.json({ data: { token, user } });
});

// CREATE bookets
router.post("/bookets", authService.ensureAuth(), async (req, res, next) => {
  const { bookInfo } = req.body;
  const userId = req.user.id;
  if (!bookInfo.isbn) res.status(400).end("no isbn");
  if (!bookInfo.title) res.status(400).end("no title");

  const booket = {
    userId,
    ...bookInfo,
    imageLink: bookInfo.coverLargeUrl
  };
  const booket_instance = new Bookets(booket);
  await booket_instance.save();

  res.status(201).json({ booket });
});

// FETCHT bookets
router.get("/bookets", authService.ensureAuth(), async (req, res, next) => {
  const userId = req.user.id;
  const list = await Bookets.find({ userId });
  res.json({ list });
});
module.exports = router;
