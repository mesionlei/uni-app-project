const express = require("express");
const Home = express.Router();

const Product = require("../model/product.js");

// Home.get("/", (req, res) => {
//   res.send("sss");
// });

Home.get("/swiperdata", (req, res) => {
  res.send([{
      image_src: "http://localhost:5000/home/swiperdata/huasheng.png",
      cat_name: "白花生",
      cat_price: "30"
    },
    {
      image_src: "http://localhost:5000/home/swiperdata/yumi.png",
      cat_name: "水果玉米",
      cat_price: "29"
    },
    {
      image_src: "http://localhost:5000/home/swiperdata/shanyao.png",
      cat_name: "铁棍山药",
      cat_price: "40"
    },
  ]);
});

Home.get("/cate", (req, res) => {
  res.send([{
      name: "分类",
      image_src: "http://localhost:5000/home/cate/cate.png",
      open_type: "switchTab",
      navigator_url: "/pages/cate/cate"
    },
    {
      name: "秒杀拍",
      image_src: "http://localhost:5000/home/cate/sale.png"
    },
    {
      name: "超市购",
      image_src: "http://localhost:5000/home/cate/shop.png"
    },
    {
      name: "母婴",
      image_src: "http://localhost:5000/home/cate/baby.png"
    }
  ]);
});

Home.get("/floordata", async (req, res) => {
  const floordata = await Product.find();
  // console.log(floordata)
  res.send(floordata);
});

module.exports = Home;
