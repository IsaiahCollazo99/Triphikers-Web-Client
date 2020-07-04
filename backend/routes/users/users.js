const users = require("express").Router();
const { createNewUser } = require("../../queries/users/users");

users.post("/", createNewUser);

module.exports = users;
