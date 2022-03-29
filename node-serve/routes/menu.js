const Menu = require("express")();

const MenuList = require("../model/menulist");

Menu.get("/menus", async (req, res) => {
  const results = await MenuList.findOne();
  //   console.log(results);
  res.send(results);
  // console.log(req.body);
  // res.send("收到");
});

module.exports = Menu;
