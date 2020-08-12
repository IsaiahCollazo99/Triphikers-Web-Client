const trips = require('express').Router();

const { 
    getAllTrips, 
    getTripById, 
    getTripRequests,
    createTrip,
    createRequest,
    deleteTrip,
    completeTrip,
    deleteRequest,
    getTripTravelers,
    addTraveler,
    deleteTraveler
} = require('../../queries/trips/trips');

trips.get("/", getAllTrips);
trips.get("/:id", getTripById);
trips.get("/:id/requests", getTripRequests);
trips.get("/:id/travelers", getTripTravelers);
trips.post("/", createTrip);
trips.post("/:id/requests", createRequest);
trips.post("/:id/travelers", addTraveler);
trips.patch("/:id", completeTrip);
trips.delete("/:id", deleteTrip);
trips.delete("/:id/requests", deleteRequest);
trips.delete("/:id/travelers", deleteTraveler);

module.exports = trips;