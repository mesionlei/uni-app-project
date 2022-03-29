const express = require("express");

const Orders = express.Router();

const Order = require("../model/order");

Orders.get("/", async (req, res) => {
  const {
    query
  } = req.query;
  if (query === "") {
    const orders = await Order.find();
    const result = [];
    orders.forEach((item, index) => {
      item.children.forEach((item2, index2) => {
        item2.state = item.state;
        item2.id = item.id;
        result.push(item2);
      });
    });
    res.send({
      data: result,
      meta: {
        msg: "获取成功",
        status: 200
      }
    });
  } else if (query === "未发货") {
    const orders = await Order.findOne({
      state: query
    });
    const result = [];
    orders.children.forEach((item, index) => {
      item.state = query;
      item.id = orders.id;
      result.push(item);
    });
    res.send({
      data: result,
      meta: {
        msg: "获取成功",
        status: 200
      }
    });
  } else {
    const orders = await Order.findOne({
      state: query
    });
    const result = [];
    orders.children.forEach((item, index) => {
      item.state = query;
      item.id = orders.id;
      result.push(item);
    });
    res.send({
      data: result,
      meta: {
        msg: "获取成功",
        status: 200
      }
    });
  }
});

let id2 = 1;
Orders.post("/updatestate", async (req, res) => {
  // console.log(req.body);
  let {
    username,
    goods,
    amount,
    id1,
    id
  } = req.body;
  const {
    children
  } = await Order.findOne({
    id
  });
  children.forEach((item, index) => {
    if (item.id1 === id1) {
      children.splice(index, 1);
    }
  });
  await Order.updateOne({
    id
  }, {
    children
  });
  const {
    children: children1
  } = await Order.findOne({
    id: 2
  });
  children1.forEach((item, index) => {
    if (index + 1 === children1.length) {
      id2 = item.id1 + 1;
    }
  });
  children1.push({
    username,
    goods,
    amount,
    id1: id2
  });
  await Order.updateOne({
    id: 2
  }, {
    children: children1
  });
  res.send({
    data: children1,
    meta: {
      msg: "更新成功",
      status: 200
    }
  });
  // const {id,}=await Order.findOne({id})
});

Orders.post('/addorder', async (req, res) => {
  let id1 = 1
  const body = req.body
  const {
    children
  } = await Order.findOne({
    id: 1
  })
  children.forEach((item, index) => {
    if (index + 1 === children.length) {
      id1 = item.id1 + 1
    }
  })
body.forEach((item,index)=>{
  children.push({
    username: '微信用户',
    goods: item.goods_name,
    amount: item.goods_count,
    id1:id1+index
  })
})
  await Order.updateOne({
    id: 1
  }, {
    children
  })
  res.send({
    data: children,
    meta: {
      msg: "订单提交成功",
      status: 200
    }
  })
})
module.exports = Orders;
