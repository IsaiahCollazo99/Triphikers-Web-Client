const users = require("express").Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  getUserTrips,
  updateUser,
  isUserExisting
} = require("../../queries/users/users");

users.post("/", createUser);
users.get("/", getAllUsers);
users.get("/:id", getUserById);
users.get("/:id/trips", getUserTrips);
users.patch("/:id", isUserExisting, updateUser)

module.exports = users;
