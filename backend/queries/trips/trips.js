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
                    message: "Retrieved all trips.",
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
                message: `Retrieved trip ${id}.`,
                trip
            })

        } catch ( error ) {
            if(error.received == 0) {
                next({ status: 404, error: `Trip ${id} doesn't exist.`})
            } else {
                next(error);
            }

        }
    },

    createTrip: async ( req, res, next ) => {
        try {
            const {
                planner_id, destination, date_from, date_to, group_type, language, 
                before_trip_meetup, trip_type, trip_title, first_time, accommodation,
                budget, split_costs, itinerary, description
            } = req.body;

            const trip = await db.one(`
                INSERT INTO trips (planner_id, destination, date_from, date_to, group_type,
                language, before_trip_meetup, trip_type, trip_title, first_time, accommodation,
                budget, split_costs, itinerary, description)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
                RETURNING *
            `, [planner_id, destination, date_from, date_to, group_type, language,
                before_trip_meetup, trip_type, trip_title, first_time, accommodation,
                budget, split_costs, itinerary, description]
            )

            res.status(200).json({
                status: "OK",
                message: "Created new trip.",
                trip
            })

        } catch ( error ) {
            next(error);
        }
    },

    deleteTrip: async ( req, res, next ) => {
        const { id } = req.params;
        try {
            await db.none(`
                DELETE FROM trips
                WHERE id=$1
            `, id);

            res.status(200).json({
                status: "OK",
                message: `Deleted trip ${id}`
            })
        } catch ( error ) {
            next(error);
        }
    }
} 