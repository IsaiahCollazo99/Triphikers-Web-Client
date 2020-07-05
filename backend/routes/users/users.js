const users = require("express").Router();
const {
  createUser,
  getAllUsers
} = require("../../queries/users/users");

users.post("/", createUser);
users.get("/", getAllUsers)

module.exports = users;
