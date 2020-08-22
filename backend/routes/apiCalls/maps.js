const maps = require('express').Router();
const axios = require('axios').default;
require("dotenv").config()

const getImages = async (req, res, next) => {
    try {
        const { locationName } = req.query;
        let placeID = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${locationName}&inputtype=textquery&fields=photos&key=${process.env.MAPSKEY}`);  
        res.status(200).json({
                status: "OK",
                message: "Place ID",
                placeID: placeID.data
            })
    } catch (error) {
        next(error)
    }
}

maps.get("/:city", getImages)

module.exports = maps;