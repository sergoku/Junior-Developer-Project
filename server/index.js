const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const initDataBase = require("./initDB/initDataBase");
const routes = require("./routes");
const cors = require("cors");
const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));
app.use(cors());
app.use("/api", routes);

const PORT = config.get("PORT");
async function start() {
  try {
    mongoose.connection.once("open", () => {
      initDataBase();
    });
    await mongoose.connect(config.get("api"));
    console.log("connect");
    app.listen(PORT, () => console.log(`port: ${PORT}`));
  } catch (e) {
    console.log("something is wrong");
    process.exit(1);
  }
}
start();
