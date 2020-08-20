const friendRequests = require('express').Router();

const {
    sendFriendRequest
} = require('../../queries/friendRequests/friendRequests');

friendRequests.post("/", sendFriendRequest);

module.exports = friendRequests;