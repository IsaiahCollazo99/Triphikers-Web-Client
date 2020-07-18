const db = require("../../db/db");

module.exports = {
    getAllHotspots: async ( req, res, next ) => {
        try {
            const hotspots = await db.any(`
            SELECT * FROM hotspots ORDER BY hotspots.id
            `);
            if(hotspots.length) {
                res.status(200).json({
                    status: "OK",
                    message: "Retrieved all hotspots.",
                    hotspots
                })
            } else {
                throw { status: 404, error: "No hotspots found." }
            }
        } catch ( error ) {
            next(error);
        }

    },

    addHotspot: async ( req, res, next ) => {
        try {
            const {
                lat, lng, hotspot_title, body, image, poster_id
            } = req.body;
            const hotspot = await db.one(`
                INSERT INTO hotspots (lat, lng, hotspot_title, body, image, poster_id)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *
            `, [lat, lng, hotspot_title, body, image, poster_id]
            )
            res.status(200).json({
                status: "OK",
                message: "Created a new hotspot.",
                hotspot
            })

        } catch ( error ) {
            next(error);
        }
    }
} 
