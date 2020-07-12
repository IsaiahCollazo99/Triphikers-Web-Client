const db = require("../../db/db");

module.exports = {
    getAllLocations: async ( req, res, next ) => {
        try {
            const locations = await db.any(`SELECT * FROM locations`);
            if(locations.length) {
                res.status(200).json({
                    status: "OK",
                    message: "Retrieved all locations.",
                    locations
                })
            } else {
                throw { status: 404, error: "No locations found." }
            }
        } catch ( error ) {
            next(error);
        }

    },

    getLocationById: async ( req, res, next ) => {
        const { id } = req.params;
        try {
            const location = await db.one(`SELECT * FROM locations WHERE id=${id}`);
            res.status(200).json({
                status: "OK",
                message: `Retrieved location ${id}.`,
                location
            })

        } catch ( error ) {
            if(error.received == 0) {
                next({ status: 404, error: `Location ${id} doesn't exist.`})
            } else {
                next(error);
            }
        }
    }
} 