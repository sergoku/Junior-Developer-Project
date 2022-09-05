const express = require("express");
const Processor = require("../model/Processor");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router.get("/", async (req, res) => {
  try {
    const getProcessor = await Processor.find();
    res.send(getProcessor);
  } catch (e) {
    res.status(500).json({ error: "Мы не смогли загрузить раздел Процессоры" });
  }
});
router.post("/addItem/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const newItem = await Processor.create({ ...req.body, createdBy: id });
    res.send(newItem);
  } catch (e) {
    res.status(500).json({
      error: "Мы не смогли добавить товар в раздел Процессоры",
    });
  }
});
router.delete("/deleteItem/:itemId", auth, async (req, res) => {
  try {
    const { itemId } = req.params;
    const newItem = await Processor.findOneAndDelete({ createdBy: itemId });
    res.send(newItem);
  } catch (e) {
    res.status(500).json({
      error: "Мы не смогли удалить товар из раздела Процессоры",
    });
  }
});
module.exports = router;
