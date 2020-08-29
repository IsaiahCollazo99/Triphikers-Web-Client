const users = require("express").Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  getUserTrips,
  updateUser,
  getUserFriendRequests,
  deleteFriendRequest,
  getUsersFriends,
  deleteFriend,
  getUserByUsername,
  getUserByEmail
} = require("../../queries/users/users");

users.post("/", createUser);
users.get("/", getAllUsers);
users.get("/:id", getUserById);
users.get("/:id/trips", getUserTrips);
users.get("/:id/friendRequests", getUserFriendRequests);
users.get("/:id/friends", getUsersFriends);
users.get("/username/:username", getUserByUsername);
users.get("/email/:email", getUserByEmail);
users.patch("/:id", updateUser);
users.delete("/:id/friendRequests", deleteFriendRequest);
users.delete("/:id/friends", deleteFriend);

module.exports = users;
