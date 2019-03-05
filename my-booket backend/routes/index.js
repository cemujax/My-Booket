const express = require("express");
const Users = require("../models/users");
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

module.exports = router;
