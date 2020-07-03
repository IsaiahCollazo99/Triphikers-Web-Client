const trips = require('express').Router();

const { getAllTrips } = require('../../queries/trips/trips');

trips.get("/", getAllTrips);
trips.get("/:id");
trips.post("/");
trips.patch("/id");
trips.delete("/:id");

module.exports = trips;