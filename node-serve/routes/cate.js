const express = require("express");
const Cate = express.Router();

const multer = require("multer");

const Categories = require("../model/cate.js");

Cate.get("/categories", async (req, res) => {
  const categories = await Categories.findOne();
  // console.log(floordata)
  res.send(categories);
});

Cate.get("/catelist", async (req, res) => {
  // console.log(req.query.query)
  const query = req.query.query;
  const categories = await Categories.findOne();
  const catelist = [];
  for (i = 0; i < categories.message.length; i++) {
    for (j = 0; j < categories.message[i].children.length; j++) {
      if (categories.message[i].children[j].cat_name.indexOf(query) != -1)
        catelist.push(categories.message[i].children[j]);
    }
  }
  // console.log(catelist)
  res.send(catelist);
});

//cms-api
Cate.get("/goods", async (req, res) => {
  const body = req.query;
  const { message } = await Categories.findOne();
  //result表示全部商品
  let result = Array();
  //sresult表示筛选过的商品
  let sresult = Array();
  message.forEach((item) => {
    const catname = item.cat_name;
    const { id1 } = item;
    item.children.forEach((item2) => {
      item2.catname = catname;
      item2.id1 = id1;
      result.push(item2);
    });
  });
  if (body.query === "") {
    res.send({
      data: {
        goods: result,
      },
      meta: {
        msg: "获取成功",
        status: 200,
      },
    });
  } else {
    result.forEach((good) => {
      if (
        good.cat_name.indexOf(body.query) != -1 ||
        good.catname.indexOf(body.query) != -1
      ) {
        sresult.push(good);
      }
    });
    if (sresult.length === 0) {
      res.send({
        meta: {
          msg: "该商品不存在",
          status: 500,
        },
      });
    } else {
      res.send({
        data: {
          goods: sresult,
        },
        meta: {
          msg: "获取成功",
          status: 200,
        },
      });
    }
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/../public/cate");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
let filename = "";
let catename, goodid;
// const upload = multer({ dest: __dirname + "/../public/cate" });
Cate.post("/add", upload.single("file"), async (req, res) => {
  // console.log(file);
  // console.log(filename);
  // console.log(!req.file);
  if (!req.file) {
    const { catname, cat_name, cat_price } = req.body;
    catename = catname;
    const { message } = await Categories.findOne();
    let id2 = 1;
    message.forEach((item) => {
      if (item.cat_name === catname) {
        item.children.forEach((item2, index2) => {
          if (index2 + 1 === item.children.length) {
            id2 = item2.id2 + 1;
          }
        });
        item.children.push({ cat_name, cat_price, id2 });
      }
    });
    goodid = id2;
    await Categories.updateOne({ id: 1 }, { message });
    res.send({ data: message, meta: { msg: "添加成功", status: 200 } });
  } else {
    const file = req.file;
    filename = file.originalname;
    const { message } = await Categories.findOne({ id: 1 });
    message.forEach((item, index) => {
      if (item.cat_name === catename) {
        item.children.forEach((item2, index2) => {
          if (item2.id2 === goodid) {
            item2.cat_icon = "http://localhost:5000/cate/" + filename;
          }
        });
      }
    });
    await Categories.updateOne({ id: 1 }, { message });
    res.send({ meta: { msg: "图片上传成功", status: 200 } });
  }
});

let catid;
Cate.post("/update", upload.single("file"), async (req, res) => {
  // console.log(req.file);
  if (!req.file) {
    // console.log("1");
    const { id1, id2, catname, cat_name, cat_icon, cat_price } = req.body;
    catid = id1;
    goodid = id2;
    // console.log(catid, goodid);
    // 删除旧数据;
    const { message } = await Categories.findOne({ id: 1 });
    message.forEach((item, index) => {
      if (item.id1 === id1) {
        item.children.forEach((item2, index2) => {
          if (item2.id2 === id2) {
            item.children.splice(index2, 1);
          }
        });
      }
    });
    await Categories.updateOne({ id: 1 }, { message });

    // 添加新数据;
    const result = await Categories.findOne({ id: 1 });
    const message2 = result.message;
    message2.forEach((item, index) => {
      if (item.cat_name === catname) {
        item.children.push({ cat_name, cat_icon, cat_price, id2 });
      }
    });
    await Categories.updateOne({ id: 1 }, { message: message2 });
    res.send({
      data: message2,
      meta: {
        msg: "修改成功",
        status: 200,
      },
    });
  } else {
    // console.log("2");
    // console.log(catid, goodid);
    const file = req.file;
    filename = file.originalname;
    // console.log(filename);
    const { message } = await Categories.findOne({ id: 1 });
    message.forEach((item, index) => {
      if (item.id1 === catid) {
        item.children.forEach((item2, index2) => {
          if (item2.id2 === goodid) {
            // console.log(item2);
            item2.cat_icon = "http://localhost:5000/cate/" + filename;
          }
        });
      }
    });
    await Categories.updateOne({ id: 1 }, { message });
    res.send({ meta: { msg: "图片上传成功", status: 200 } });
  }
});

Cate.post("/delete", async (req, res) => {
  const { id1, id2 } = req.body;
  const { message } = await Categories.findOne();

  for (i = 0; i < message.length; i++) {
    if (message[i].id1 === id1) {
      for (j = 0; j < message[i].children.length; j++) {
        if (message[i].children[j].id2 === id2) {
          message[i].children.splice(j, 1);
        }
      }
    }
  }
  await Categories.updateOne({ id: 1 }, { message });
  res.send({ meta: { msg: "删除成功", status: 200 } });
});

//cms商品分类
Cate.get("/getcates", async (req, res) => {
  const { query } = req.query;
  const { message } = await Categories.findOne();
  let result = [];
  if (query === "") {
    message.forEach((item, index) => {
      result.push({ catname: item.cat_name, id1: item.id1 });
    });
    res.send({
      data: {
        cates: result,
      },
      meta: {
        msg: "获取成功",
        status: 200,
      },
    });
  } else {
    message.forEach((item, index) => {
      if (item.cat_name.indexOf(query) != -1) {
        result.push({ catname: item.cat_name, id1: item.id1 });
      }
    });
    if (result.length === 0) {
      res.send({ meta: { msg: "你搜索的分类不存在", status: 500 } });
    } else {
      res.send({
        data: {
          cates: result,
        },
        meta: {
          msg: "获取成功",
          status: 200,
        },
      });
    }
  }
});

Cate.post("/addcate", async (req, res) => {
  // console.log(req.body);
  const { catname } = req.body;
  const { message } = await Categories.findOne({ id: 1 });
  let id1 = 1;
  message.forEach((item, index) => {
    if (index + 1 === message.length) {
      id1 = item.id1 + 1;
    }
  });
  message.push({ cat_name: catname, id1, children: [] });
  await Categories.updateOne({ id: 1 }, { message });
  res.send({ data: message, meta: { msg: "更新成功", status: 200 } });
});

Cate.post("/updatecate", async (req, res) => {
  const { catname, id1 } = req.body;
  const { message } = await Categories.findOne({ id: 1 });
  message.forEach((item, index) => {
    if (item.id1 === id1) {
      item.cat_name = catname;
    }
  });
  await Categories.updateOne({ id: 1 }, { message });
  res.send({ data: message, meta: { msg: "更新成功", status: 200 } });
});

Cate.post("/deletecate", async (req, res) => {
  // console.log(req.body);
  const { id1 } = req.body;
  const { message } = await Categories.findOne();
  message.forEach((item, index) => {
    if (item.id1 === id1) {
      message.splice(index, 1);
    }
  });
  await Categories.updateOne({ id: 1 }, { message });
  res.send({ data: message, meta: { msg: "删除成功", status: 200 } });
});
module.exports = Cate;
