const mongoose = require("mongoose");

const Product = mongoose.model(
  "product",
  new mongoose.Schema({
    product_list: {
      type: Array
    },
    product_title:{
      type:String
    }
  })
);

module.exports = Product;
