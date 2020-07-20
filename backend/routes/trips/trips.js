const trips = require('express').Router();

const { 
    getAllTrips, 
    getTripById, 
    getTripRequests,
    createTrip,
    createRequest,
    deleteTrip,
    completeTrip
} = require('../../queries/trips/trips');

trips.get("/", getAllTrips);
trips.get("/:id", getTripById);
trips.get("/:id/requests", getTripRequests);
trips.post("/", createTrip);
trips.post("/:id/requests", createRequest);
trips.patch("/:id", completeTrip);
trips.delete("/:id", deleteTrip);

module.exports = trips;