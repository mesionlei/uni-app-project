const mongoose = require("mongoose");

const MenuList = mongoose.model(
  "menu",
  new mongoose.Schema({
    data: {
      type: Array,
    },
    meta: {
      type: Object,
    },
  })
);

module.exports = MenuList;
