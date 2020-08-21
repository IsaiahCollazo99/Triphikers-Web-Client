const friendRequests = require('express').Router();

const {
    sendFriendRequest,
    acceptFriendRequest
} = require('../../queries/friendRequests/friendRequests');

friendRequests.post("/accept", acceptFriendRequest);
friendRequests.post("/", sendFriendRequest);

module.exports = friendRequests;