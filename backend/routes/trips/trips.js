const trips = require('express').Router();

const {} = require('../../queries/trips/trips');

trips.get("/");
trips.get("/:id");
trips.post("/");
trips.patch("/id");
trips.delete("/:id");

module.exports = trips;