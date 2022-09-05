const express = require("express");
const Popular = require("../model/Popular");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const getPopular = await Popular.find();
    res.send(getPopular);
  } catch (e) {
    res.status(500).json({ error: "Мы не смогли загрузить раздел Популярное" });
  }
});
router.get("/item/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getPopular = await Popular.find({ id });
    res.send(...getPopular);
  } catch (e) {
    res.status(500).json({ error: "Мы не смогли загрузить раздел Популярное" });
  }
});
router.get("/:title", async (req, res) => {
  const { title } = req.params;
  try {
    const getSearchItem = await Popular.find({
      title: { $regex: title, $options: "i" },
    });
    res.send(getSearchItem);
  } catch (e) {
    res.status(500).json({ error: "Мы не смогли загрузить раздел Популярное" });
  }
});
module.exports = router;
