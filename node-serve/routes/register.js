const register = require("express")();

const User = require("../model/user");

register.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    return res.send({ code: 0, msg: "用户已存在" });
  }
  User.create({ username, password }).then(() => {
    res.send({ code: 1, msg: "注册成功" });
  });
});

module.exports = register;
