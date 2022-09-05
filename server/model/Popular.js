const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    id: {
      type: String,

      unique: true,
    },
    title: {
      type: String,

      unique: true,
    },
    image: String,

    price: {
      type: Number,
    },
    categoria: {
      type: String,
      enum: ["motherboard", "processor", "videocard"],
    },
  },
  { timestamps: true }
);

module.exports = model("Popular", schema);
