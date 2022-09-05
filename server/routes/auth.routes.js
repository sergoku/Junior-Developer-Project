const express = require("express");
const User = require("../model/User");
const router = express.Router({ mergeParams: true });
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const tokenService = require("../service/tokenService");
const Token = require("../model/Token");

router.post("/register", [
  check("email", "email is wrong").isEmail(),
  check("password", "password is wrong").isLength({ min: 8 }),
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "invalid data",
            code: 400,
          },
        });
      }
      const { email, password } = req.body;

      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(400).json({
          error: {
            message: "EMAIL_EXIST",
            code: 400,
          },
        });
      }

      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = await User.create({
        ...req.body,
        image:
          "https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg",
        password: hashPassword,
      });
      const tokenForNewUser = tokenService.generate({ id: newUser._id });
      await tokenService.save(newUser._id, tokenForNewUser.refreshToken);

      res.status(201).send({
        ...tokenForNewUser,
        id: newUser._id,
        image: newUser.image,
        email,
      });
    } catch (e) {
      res.status(500).json({
        message: "is wrong",
      });
      console.log(e);
    }
  },
]);
router.post("/login", [
  check("email", "email is wrong").normalizeEmail().isEmail(),
  check("password", "password is wrong").exists(),
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "invalid data",
            code: 400,
          },
        });
      }
      const { email, password } = req.body;

      const userFind = await User.findOne({ email });
      if (!userFind) {
        return res.status(400).json({
          error: "invalid data",
        });
      }
      const comparePassordRes = await bcrypt.compare(
        password,
        userFind.password
      );
      if (!comparePassordRes) {
        return res.status(400).json({
          error: "invalid data",
        });
      }
      const tokenForLogInUser = tokenService.generate({ id: userFind._id });
      await tokenService.save(userFind._id, tokenForLogInUser.refreshToken);
      res.send({
        ...tokenForLogInUser,
        id: userFind._id,
        image: userFind.image,
        historyBuy: userFind.historyBuy,
        basket: userFind.basket,
        email,
      });
    } catch (e) {
      res.status(500).json({
        message: "is wrong",
      });
      console.log(e);
    }
  },
]);
router.post("/token", async (req, res) => {
  try {
    const { refresh_token: refreshToken, id } = req.body;
    const refreshTokenVerify = await tokenService.validateRefreshToken(
      refreshToken
    );
    const dbToken = await Token.findOne({ refreshToken });

    if (id) {
      const userFind = await User.findById(id);
      if (userFind) {
        const tokenForLogInUser = tokenService.generate({ id: userFind._id });
        await tokenService.save(userFind._id, tokenForLogInUser.refreshToken);
        res.send({
          ...tokenForLogInUser,
          id: userFind._id,
          image: userFind.image,
          email: userFind.email,
        });
        return userFind;
      }
    } else if (
      !refreshTokenVerify ||
      !dbToken ||
      refreshTokenVerify.id !== dbToken?.user?.toString()
    ) {
      return res.status(401).json({ message: "not authorize2" });
    }
    const tokensForLogInUser = tokenService.generate({
      id: refreshTokenVerify.id,
    });
    await tokenService.save(
      refreshTokenVerify.id,
      tokensForLogInUser.refreshToken
    );
    res.send({ ...tokensForLogInUser, id: refreshTokenVerify.id });
  } catch (e) {
    res.status(500).json({
      message: "something is wrong",
    });
    console.log(e);
  }
});

module.exports = router;
