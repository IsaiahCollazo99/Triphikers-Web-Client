const db = require("../../db/db");

module.exports = {
    sendFriendRequest: async ( req, res, next ) => {
        try {
            const { requester_id, requested_id } = req.body;
            const friendRequest = await db.one(`
                INSERT INTO friend_requests (requester_id, requested_id)
                VALUES ($1, $2) RETURNING *
            `, [requester_id, requested_id]);

            res.status(200).json({
                status: "OK",
                friendRequest,
                message: "Friend Request successfuly made."
            })
        } catch ( error ) {
            next(error);
        }
    }
}