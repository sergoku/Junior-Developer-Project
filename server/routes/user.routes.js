///not finished

const express = require("express");
const User = require("../model/User");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");
const bcrypt = require("bcryptjs");

router.patch("/edit/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    if (password && id === req.user.id) {
      const hashPassword = await bcrypt.hash(password, 12);
      const user = await User.findByIdAndUpdate(
        id,
        { ...req.body, password: hashPassword },
        {
          new: true,
        }
      );
      res.send(user);
    } else if (id === req.user.id) {
      const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.send(user);
    } else {
      res.status(401).json({ error: "Мы не смогли изменить раздел Профиль" });
    }
  } catch (e) {
    res.status(401).json({ error: "Мы не смогли изменить раздел Профиль" });
  }
});
router.patch("/buy/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (id === req.user.id) {
      const user = await User.findByIdAndUpdate(
        id,
        { $addToSet: req.body },
        {
          new: true,
        }
      );

      res.send(user);
    } else {
      res.status(401).json({ error: "Мы не смогли изменить раздел Профиль" });
    }
  } catch (e) {
    res.status(401).json({ error: "Мы не смогли изменить раздел Профиль" });
  }
});
router.patch("/confimOrder/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (id === req.user.id) {
      const user = await User.findByIdAndUpdate(
        id,
        { $unset: { basket: {} }, $addToSet: req.body },
        {
          new: true,
        }
      );

      res.send(user);
    } else {
      res.status(401).json({ error: "Мы не смогли изменить раздел Профиль" });
    }
  } catch (e) {
    res.status(401).json({ error: "Мы не смогли изменить раздел Профиль" });
  }
});
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    res.send(user);
  } catch (e) {
    res.status(401).json({ error: "Мы не смогли загрузить раздел Профиль" });
  }
});

module.exports = router;
