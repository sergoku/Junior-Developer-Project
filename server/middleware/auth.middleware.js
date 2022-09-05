const tokenService = require("../service/tokenService");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: {
          error: "unautorize",
        },
      });
    }
    const validateAccsess = tokenService.validateAccsessToken(token);
    if (!validateAccsess) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = validateAccsess;
    next();
  } catch (error) {
    return res.status(401).json({
      message: {
        err: "unautorize",
        message: error,
      },
    });
  }
};
