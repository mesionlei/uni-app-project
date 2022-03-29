const express = require("express");

require("./model/connect");
const Login = require("./routes/login");
const Register = require("./routes/register");
const Home = require("./routes/home");
const Cate = require("./routes/cate");
const Menu = require("./routes/menu");
const Users = require("./routes/users");
const Orders = require("./routes/orders");

const app = express();

const path = require("path");
//开放静态资源
app.use(express.static(path.join(__dirname, "public")));

//实现跨域请求
app.use(require("cors")());
//对客户端发来的json数据进行解析
app.use(express.json());

//路由中转
app.post("/login", Login);
app.post("/register", Register);
app.use("/home", Home);
app.use("/cate", Cate);
app.get("/menus", Menu);
app.use("/users", Users);
app.use("/order", Orders);

app.listen(5000, () => {
  console.log("服务器启动成功...");
});
