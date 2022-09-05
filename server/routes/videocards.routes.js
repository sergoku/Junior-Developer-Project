const express = require("express");
const Videocard = require("../model/Videocard");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router.get("/", async (req, res) => {
  try {
    const getVideocard = await Videocard.find();
    res.send(getVideocard);
  } catch (e) {
    res.status(500).json({ error: "Мы не смогли загрузить раздел Видеокарты" });
  }
});
router.post("/addItem/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const newItem = await Videocard.create({ ...req.body, createdBy: id });
    res.send(newItem);
  } catch (e) {
    res.status(500).json({
      error: "Мы не смогли добавить товар в раздел Видеокарты",
    });
  }
});
router.delete("/deleteItem/:itemId", auth, async (req, res) => {
  try {
    const { itemId } = req.params;
    const newItem = await Videocard.findOneAndDelete({ createdBy: itemId });
    res.send(newItem);
  } catch (e) {
    res.status(500).json({
      error: "Мы не смогли удалить товар из раздела Видеокарты",
    });
  }
});
module.exports = router;
