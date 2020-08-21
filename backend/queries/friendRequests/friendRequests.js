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
    },

    acceptFriendRequest: async ( req, res, next ) => {
        const { requester_id, requested_id } = req.body;
        try {
            const accepted = await db.one(`
                INSERT INTO friends_lists (user_1, user_2)
                VALUES ($1, $2) RETURNING *
            `, [requested_id, requester_id]);

            await db.none(`
                DELETE FROM friend_requests
                WHERE requester_id=$1
            `, requester_id)

            res.status(200).json({
                status: "OK",
                accepted,
                message: "Friend Request accepted."
            })
        } catch ( error ) {
            next(error);
        }
    }
}