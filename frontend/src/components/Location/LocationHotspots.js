import React, { useState, useEffect } from "react";
import "../../css/locations/LocationHotspots.css";
import HotspotMap from "../helper/maps/HotspotMaps";

const LocationHotspots = ({info}) => {
    const [submitCoordinates, setSubmitCoordinates] = useState([])

    const fetchHotspotCoordinates = (coordinates) => {
        setSubmitCoordinates(coordinates);
    }

    const getMap = (lat, lng) => {
        if(lat !== undefined){
            let coordinates = {
                lat: lat,
                lng: lng
            }
            return(
                <HotspotMap location={coordinates} fetchHotspotCoordinates={fetchHotspotCoordinates}/>
            )
        }
    }

    useEffect(() => {
    }, [info])

    return (
        <div className="hotSpotContainer">
            <div className="hotSpotMap">
                {getMap(info.lat, info.lng)}
            </div>
            <form className="hotSpotForm">
                <h1 className="hotSpotTitle">Hotspot Submission</h1>
                <p className="lat"><b>Latitude:</b> {submitCoordinates.lat}</p>
                <p className="lng"><b>Longitude:</b> {submitCoordinates.lng}</p>
                <input type="text" placeholder="Type a Description"/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default LocationHotspots;