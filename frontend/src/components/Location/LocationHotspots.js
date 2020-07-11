import React, { useState, useEffect } from "react";
import "../../css/locations/LocationHotspots.css";
import HotspotMap from "../helper/maps/HotspotMaps";

const LocationHotspots = ({info}) => {
    const [submitCoordinates, setSubmitCoordinates] = useState([]);
    const [selectedHotspot, setSelectedHotspot] = useState(null);

    const fetchData = (data) => {
        setSubmitCoordinates(data.coordinates);
        setSelectedHotspot(data.selected);
    }

    const getMap = (lat, lng) => {
        if(lat !== undefined){
            let coordinates = {
                lat: lat,
                lng: lng
            }
            return(
                <HotspotMap location={coordinates} fetchData={fetchData}/>
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
                <p className="submitLat"><b>Latitude:</b> {submitCoordinates.lat}</p>
                <p className="submitLng"><b>Longitude:</b> {submitCoordinates.lng}</p>
                <input type="text" placeholder="Hotspot Title"/>
                <input type="text" placeholder="Type a Description"/>
                <input type="submit"/>
            </form>
                {selectedHotspot ? (
                    <div className="Selected">
                        <h1 className="hotSpotSelectedTitle">Selected Hotspot</h1>
                        <p className="submitLat"><b>Latitude:</b> {selectedHotspot.lat}</p>
                        <p className="submitLat"><b>Longitude:</b> {selectedHotspot.lng}</p>
                        <h2>{selectedHotspot.hotspot_title}</h2>
                        <p>{selectedHotspot.body}</p>
                        <p>Submitted by {selectedHotspot.poster_id}</p>
                    </div>
                ) : null}
        </div>
    )
}

export default LocationHotspots;