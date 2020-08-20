const users = require("express").Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  getUserTrips,
  updateUser,
  isUserExisting,
  getUserFriendRequests,
  deleteFriendRequest
} = require("../../queries/users/users");

users.post("/", createUser);
users.get("/", getAllUsers);
users.get("/:id", getUserById);
users.get("/:id/trips", getUserTrips);
users.get("/:id/friendRequests", getUserFriendRequests);
users.patch("/:id", isUserExisting, updateUser);
users.delete("/:id/friendRequests", deleteFriendRequest);

module.exports = users;
