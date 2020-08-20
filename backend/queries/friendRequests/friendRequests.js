const db = require("../../db/db");

module.exports = {
    sendFriendRequest: async ( req, res, next ) => {
        try {
            const { requester_id, requested_id } = req.body;
            
        } catch ( error ) {
            next(error);
        }
    }
}