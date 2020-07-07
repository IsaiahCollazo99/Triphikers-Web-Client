const locations = require('express').Router();

const { 
    getAllLocations, 
    getLocationById
} = require('../../queries/locations/locations');

locations.get("/", getAllLocations);
locations.get("/:id", getLocationById);

module.exports = locations;