const express = require("express");
const Users = require("../models/users");
const Bookets = require("../models/bookets");
const authService = require("../service/auth");
const router = express.Router();
const crypto = require("crypto");

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  const resUser = await Users.findOne({ email });

  if (!resUser)
    return res.status(401).json({ error: "존재하지 않는 Email 입니다." });

  const scryptPwd = crypto
    .scryptSync(password, resUser._id.toString(), 64, { N: 1024 })
    .toString("hex");
  if (resUser.password !== scryptPwd)
    return res.status(401).json({ error: "비밀번호가 틀립니다." });

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

router.post("/signup", (req, res, next) => {
  const form = req.body.form;

  if (!form.email) return res.send({ result: false, msg: "email 없습니다." });
  if (!form.name) return res.send({ result: false, msg: "이름이 없습니다." });
  if (!form.password)
    return res.send({ result: false, msg: "비밀번호가 없습니다." });

  Users.findOne({ email: form.email })
    .then(r => {
      if (r) throw new Error("이미 가입된 이메일입니다.");
      return Users.create({ ...form, userName: form.name });
    })
    .then(r => {
      const password = crypto
        .scryptSync(r.password, r._id.toString(), 64, { N: 1024 })
        .toString("hex");
      return Users.updateOne({ _id: r._id }, { $set: { password } });
    })
    .then(r => res.send({ result: true }))
    .catch(e => res.send({ result: false, msg: e.message }));
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

    if (key === "timelineId") {
      // timeline 삭제
      booket.timeline = booket.timeline.filter(t => {
        if (t._id != value) {
        }
        return t._id != value;
      });
    }
  });

  await booket.save();
  res.json({ item: booket });
});

module.exports = router;
