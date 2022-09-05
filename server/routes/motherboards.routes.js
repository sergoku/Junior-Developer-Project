const express = require("express");
const Motherboard = require("../model/Motherboard");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router.get("/", async (req, res) => {
  try {
    const getMotherboard = await Motherboard.find();
    res.send(getMotherboard);
  } catch (e) {
    res
      .status(500)
      .json({ error: "Мы не смогли загрузить раздел материнские платы" });
  }
});
router.post("/addItem/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const newItem = await Motherboard.create({ ...req.body, createdBy: id });
    res.send(newItem);
  } catch (e) {
    res.status(500).json({
      error: "Мы не смогли добавить товар в раздел материнские платы",
    });
  }
});
router.delete("/deleteItem/:itemId", auth, async (req, res) => {
  try {
    const { itemId } = req.params;
    const newItem = await Motherboard.findOneAndDelete({ createdBy: itemId });
    res.send(newItem);
  } catch (e) {
    res.status(500).json({
      error: "Мы не смогли удалить товар из раздела материнские платы",
    });
  }
});
module.exports = router;
