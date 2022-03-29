const express = require("express");
const Users = express.Router();

const User = require("../model/user");

Users.get("/", async (req, res) => {
  const body = req.query;
  const results = await User.find();
  let result = Array();
  if (body.query === "") {
    res.send({
      data: {
        users: results,
      },
      meta: {
        msg: "获取成功",
        status: 200,
      },
    });
  } else {
    results.forEach((user) => {
      if (user.username.indexOf(body.query) != -1) {
        result.push(user);
      }
    });
    if (result.length === 0) {
      res.send({
        meta: {
          msg: "该用户不存在",
          status: 500,
        },
      });
    } else {
      res.send({
        data: {
          users: result,
        },
        meta: {
          msg: "获取成功",
          status: 200,
        },
      });
    }
  }
});

Users.post("/add", async (req, res) => {
  const { username, password, email, mobile } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    return res.send({ meta: { msg: "该用户已存在", status: 500 } });
  }
  let id = 0;
  const users = await User.find();
  users.forEach((item, index) => {
    if (index + 1 === users.length) {
      id = item.id + 1;
    }
  });
  const create_time = parseInt(new Date().getTime() / 1000);
  User.create({
    id,
    username,
    password,
    mobile,
    email,
    type: 2,
    create_time,
    role_name: "普通员工",
  }).then((result) => {
    res.send({ data: result, meta: { status: 200, msg: "创建成功" } });
  });
});

Users.post("/update", async (req, res) => {
  const { id, username, email, mobile } = req.body;
  await User.updateOne({ id }, { username, email, mobile }).then(() => {
    res.send({ meta: { status: 200, msg: "编辑成功" } });
  });
});

Users.post("/delete", async (req, res) => {
  const { id } = req.body;
  await User.deleteOne({ id }).then(() => {
    res.send({ meta: { msg: "删除成功", status: 200 } });
  });
});

Users.get("/role", async (req, res) => {
  const { id, role_name } = req.query;
  let { type } = req.query;
  if (role_name === "超级管理员") {
    type = "1";
  } else {
    type = "2";
  }
  await User.updateOne({ id }, { role_name, type });
  res.send({
    meta: {
      msg: "修改成功",
      status: 200,
    },
  });
});
module.exports = Users;
