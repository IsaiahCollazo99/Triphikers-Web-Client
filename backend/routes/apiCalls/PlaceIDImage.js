const place = require('express').Router();
const axios = require('axios').default;
require("dotenv").config()

const getPlaceImage = async (req, res, next) => {
    try {
        let photoRef  = req.params.id;
        let placeID = await axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${process.env.MAPSKEY}`); 
        res.status(200).json({
                status: "OK",
                message: "Place ID",
                placeID: placeID.data
            })
    } catch (error) {
        next(error)
    }
}

place.get("/:id", getPlaceImage)

module.exports = place;