const db = require("../../db/db");

module.exports = {
    getAllTrips: async ( req, res, next ) => {
        try {
            const trips = await db.any(`
                SELECT users.full_name, users.age, users.profile_picture, 
                users.country_of_origin, users.gender, trips.*
                FROM trips
                LEFT JOIN users on users.id = trips.planner_id
                ORDER BY trips.id DESC
            `);

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

    },

    getTripById: async ( req, res, next ) => {
        const { id } = req.params;
        try {
            const trip = await db.one(`
                SELECT users.full_name, users.age, users.profile_picture, 
                users.country_of_origin, users.gender, trips.*
                FROM trips
                LEFT JOIN users on users.id = trips.planner_id
                WHERE trips.id=$1
            `, id);

            res.status(200).json({
                status: "OK",
                message: `Retrieved trip ${id}`,
                trip
            })

        } catch ( error ) {
            if(error.received == 0) {
                next({ status: 404, error: `Trip ${id} doesn't exist`})
            } else {
                next(error);
            }

        }
    }
} 