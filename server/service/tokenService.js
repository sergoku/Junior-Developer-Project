const jwt = require("jsonwebtoken");
const config = require("config");
const Token = require("../model/Token");

class tokenService {
  generate(id) {
    const accsessToken = jwt.sign(id, config.get("accsessToken"), {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(id, config.get("refreshToken"), {
      expiresIn: "1h",
    });
    return {
      accsessToken,
      refreshToken,
      expiresIn: Date.now() + 3600000,
    };
  }
  validateAccsessToken(accsessToken) {
    try {
      return jwt.verify(accsessToken, config.get("accsessToken"));
    } catch (e) {
      return e;
    }
  }
  validateRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get("refreshToken"));
    } catch (e) {
      return e;
    }
  }
  async save(userId, refreshToken) {
    const data = await Token.findOne({ user: userId });
    if (data) {
      data.refreshToken = refreshToken;
      return data.save();
    }
    const token = await Token.create({ user: userId, refreshToken });
    return token;
  }
}

module.exports = new tokenService();
