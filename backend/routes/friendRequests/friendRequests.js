const friendRequests = require('express').Router();

const {
    sendFriendRequest,
    acceptFriendRequest
} = require('../../queries/friendRequests/friendRequests');

friendRequests.post("/", sendFriendRequest);
friendRequests.post("/accept", acceptFriendRequest);

module.exports = friendRequests;