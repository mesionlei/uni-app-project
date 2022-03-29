const Login = require("express")();

const User = require("../model/user");

Login.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user.password === password) {
    return res.send({
      data: {
        email: user.email,
        id: user.id,
        mobile: user.mobile,
        token:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE2NDcyNDk0MDQsImV4cCI6MTY0NzMzNTgwNH0.GHtYDLtP5q5E1LYHp_3Vpz2MAVDAsRGx60uZE1so_qg",
        username: user.username,
        type: user.type,
      },
      meta: { status: 200, msg: "登陆成功" },
    });
  }
  res.send({ meta: { status: 500, msg: "账户或密码错误" } });
});

module.exports = Login;
