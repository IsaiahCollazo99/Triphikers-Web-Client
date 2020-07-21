const trips = require('express').Router();

const { 
    getAllTrips, 
    getTripById, 
    getTripRequests,
    createTrip,
    createRequest,
    deleteTrip,
    completeTrip,
    deleteRequest
} = require('../../queries/trips/trips');

trips.get("/", getAllTrips);
trips.get("/:id", getTripById);
trips.get("/:id/requests", getTripRequests);
trips.post("/", createTrip);
trips.post("/:id/requests", createRequest);
trips.patch("/:id", completeTrip);
trips.delete("/:id", deleteTrip);
trips.delete("/:id/requests", deleteRequest)

module.exports = trips;