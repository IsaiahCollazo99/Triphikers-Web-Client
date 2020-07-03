const db = require("../../db/db");

module.exports = {
    getAllTrips: async ( req, res, next ) => {
        try {
            const trips = db.any(`
                SELECT users.full_name, users.age, users.profile_pic, users.country_of_origin,
                users.gender, trips.*
                FROM trips
                LEFT JOIN users on users.id = trips.planner_id
                ORDER BY trips.id DESC
            `)

            if(trips.length) {
                res.status(200).json({
                    status: "OK",
                    message: "Retrieved all trips",
                    trips
                })
            } else {
                throw { status: 404, error: "No trips found." }
            }
        } catch ( error ) {
            next(error);
        }

    }
} 