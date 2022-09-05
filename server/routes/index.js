const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/motherboards", require("./motherboards.routes"));
router.use("/popular", require("./popular.routes"));
router.use("/processors", require("./processors.routes"));
router.use("/user", require("./user.routes"));
router.use("/videocards", require("./videocards.routes"));
module.exports = router;
