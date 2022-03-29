const mongoose = require("mongoose");

const User = mongoose.model(
  "user",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
    },
    mobile: {
      type: String,
    },
    email: {
      type: String,
    },
    type: {
      type: Number,
    },
    mg_state: {
      type: Boolean,
    },
    create_time: {
      type: String,
    },
    role_name: {
      type: String,
    },
  })
);

module.exports = User;
