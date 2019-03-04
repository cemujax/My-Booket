const express = require("express");
const Users = require("../models/users");
const authService = require("../service/auth");
const router = express.Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email, password });

  if (!user) return res.status(401).json({ error: "Login failure" });

  const token = authService.signToken(user.id);
  res.json({ token, user });
});

module.exports = router;
