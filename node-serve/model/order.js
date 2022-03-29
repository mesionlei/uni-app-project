const mongoose = require("mongoose");

const Order = mongoose.model(
  "order",
  new mongoose.Schema({
    id: {
      type: Number,
    },
    state: {
      type: String,
    },
    children: {
      type: Array,
    },
  })
);

module.exports = Order;
