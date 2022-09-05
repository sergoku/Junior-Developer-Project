const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      require,
    },
    email: {
      type: String,
      unique: true,
      require,
    },
    password: {
      type: String,
      require,
    },
    historyBuy: [{ type: Object }],
    basket: [{ type: Object }],
    image: String,
  },
  { timestamps: true }
);

module.exports = model("User", schema);
