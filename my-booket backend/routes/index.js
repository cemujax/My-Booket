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

  const bookets = await Bookets.find({ userId: resUser._id });
  res.json({ data: { token, user, bookets } });
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

  const list = await Bookets.find({ userId }).sort({
    status: 1,
    startDate: -1,
    createdAt: -1
  });
  res.json({ list });
});

// FETCHT booket
router.get("/bookets/:id", authService.ensureAuth(), async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;

  const item = await Bookets.findOne({ _id: id });

  res.json({ item });
});

// DELETE bookets
router.delete(
  "/bookets/:id",
  authService.ensureAuth(),
  async (req, res, next) => {
    const { id } = req.params;
    await Bookets.deleteOne({ _id: id });
    res.status(204).end();
  }
);

// UPDATE bookets
router.put("/bookets/:id", authService.ensureAuth(), async (req, res, next) => {
  const { id } = req.params;
  let body = req.body;
  const booket = await Bookets.findOne({ _id: id });
  if (!booket) return res.status(404).end();

  Object.keys(body).forEach(key => {
    let value = body[key];
    if (typeof value === "string") value = value.trim();

    if (!value) return;
    if (typeof value === "object") {
      booket.timeline.unshift(value);
    } else {
      booket[key] = value;
    }
  });

  await booket.save();
  res.json({ item: booket });
});
module.exports = router;
