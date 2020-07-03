const trips = require('express').Router();

const { 
    getAllTrips, 
    getTripById, 
    createTrip,
    deleteTrip
} = require('../../queries/trips/trips');

trips.get("/", getAllTrips);
trips.get("/:id", getTripById);
trips.post("/", createTrip);
trips.patch("/id");
trips.delete("/:id", deleteTrip);

module.exports = trips;