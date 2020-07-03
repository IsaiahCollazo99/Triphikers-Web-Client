const trips = require('express').Router();

const { getAllTrips, getTripById } = require('../../queries/trips/trips');

trips.get("/", getAllTrips);
trips.get("/:id", getTripById);
trips.post("/");
trips.patch("/id");
trips.delete("/:id");

module.exports = trips;