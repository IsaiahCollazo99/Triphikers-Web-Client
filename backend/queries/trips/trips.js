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
                users.country_of_origin, users.gender, users.bio, users.id AS user_id, 
                users.facebook_link, users.instagram_username, users.twitter_username,
                trips.*
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

    getTripRequests: async ( req, res, next ) => {
        const { id } = req.params;
        try {
            const tripRequests = await db.any(`
                SELECT users.full_name, users.age, users.country_of_origin, users.gender, 
                users.profile_picture, requests.*
                FROM requests
                LEFT JOIN users ON users.id=requests.requester_id
                WHERE requests.trip_id=$1
            `, id)

            if(tripRequests.length) {
                res.status(200).json({
                    status: "OK",
                    message: `Retrieved trip ${id} requests.`,
                    requests: tripRequests
                })
            } else {
                res.status(200).json({
                    status: "OK",
                    message: `No requests found.`
                })
            }
        } catch ( error ) {
            next(error);
        }
    },

    getTripTravelers: async ( req, res, next ) => {
        const { id } = req.params;
        try {
            const travelers = await db.any(`
                SELECT users.full_name, users.age, users.country_of_origin, users.gender, 
                users.profile_picture, travelers.*
                FROM travelers
                LEFT JOIN users ON users.id=travelers.traveler_id
                WHERE travelers.trip_id=$1
            `, id);

            if(travelers.length) {
                res.status(200).json({
                    status: "OK",
                    message: `Retrieved trip ${id} travelers.`,
                    travelers
                })
            } else {
                res.status(200).json({
                    status: "OK",
                    message: `No travelers found.`
                })
            }

        } catch ( error ) {
            next(error);
        }
    },

    createTrip: async ( req, res, next ) => {
        try {
            const {
                planner_id, destination, date_from, date_to, group_type, language, 
                trip_type, trip_title, first_time, accommodation,
                budget, split_costs, itinerary, description
            } = req.body;

            const trip = await db.one(`
                INSERT INTO trips (planner_id, destination, date_from, date_to, group_type,
                language, trip_type, trip_title, first_time, accommodation,
                budget, split_costs, itinerary, description)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
                RETURNING *
            `, [planner_id, destination, date_from, date_to, group_type, language,
                trip_type, trip_title, first_time, accommodation,
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

    createRequest: async ( req, res, next ) => {
        const { id } = req.params;
        const { requester_id } = req.body;
        try {
            const request = await db.one(`
                INSERT INTO REQUESTS (requester_id, trip_id)
                VALUES ($1, $2)
                RETURNING *
            `, [requester_id, id]);
            
            res.status(200).json({
                status: "OK",
                message: "Created new request.",
                request
            })
        } catch ( error ) {
            next(error);
        }
    },

    addTraveler: async ( req, res, next ) => {
        const { id } = req.params;
        const { traveler_id } = req.body;
        try {
            const traveler = await db.one(`
                INSERT INTO TRAVELERS (traveler_id, trip_id)
                VALUES ($1, $2)
                RETURNING *
            `, [traveler_id, id]);
            
            res.status(200).json({
                status: "OK",
                message: "Created new traveler.",
                traveler
            })
        } catch ( error ) {
            next(error);
        }
    },

    completeTrip: async ( req, res, next) => {
        const { id } = req.params;
        try {
            db.none(`
                UPDATE trips
                SET is_completed = 'true' 
                WHERE id=$1
            `, id);

            res.status(200).json({
                status: "OK",
                message: "Completed trip",
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
    },

    deleteRequest: async ( req, res, next ) => {
        const { id } = req.params;
        const { requester_id } = req.query;
        try {
            await db.none(`
                DELETE FROM requests
                WHERE trip_id=$1 AND requester_id=$2
            `, [id, requester_id]);

            res.status(200).json({
                status: "OK",
                message: "Deleted Request"
            })
        } catch ( error ) {
            next(error);
        }
    },

    deleteTraveler: async ( req, res, next ) => {
        const { id } = req.params;
        const { traveler_id } = req.query;
        try {
            await db.none(`
                DELETE FROM travelers
                WHERE trip_id=$1 AND traveler_id=$2
            `, [id, traveler_id]);

            res.status(200).json({
                status: "OK",
                message: "Deleted Request"
            })
        } catch ( error ) {
            next(error);
        }
    }
} 