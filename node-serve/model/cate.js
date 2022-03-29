const mongoose = require("mongoose");

const Cate = mongoose.model(
  "cate",
  new mongoose.Schema({
    message: {
      type: Array
    }
  })
);

module.exports = Cate;