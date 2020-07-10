const hotspots = require('express').Router();

const { 
    getAllHotspots, 
    addHotspot
} = require('../../queries/hotspots/hotspot');

hotspots.get("/", getAllHotspots);
hotspots.post("/", addHotspot);

module.exports = hotspots;