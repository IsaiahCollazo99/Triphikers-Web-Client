import React, { useState, useEffect } from "react";
import axios from "axios";
import { useInput } from "../../util/customHooks";
import HotspotMap from "../helper/maps/HotspotMaps";
import "../../css/locations/LocationHotspots.css";

const LocationHotspots = ({info}) => {
    const [submitCoordinates, setSubmitCoordinates] = useState([]);
    const [selectedHotspot, setSelectedHotspot] = useState(null);
    const [submitted, setSubmitted] = useState(null);
    const submitHotspotTitle = useInput("");
    const submitHotspotBody = useInput("");

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3001/api/hotspots`, {
                lat: submitCoordinates.lat,
                lng: submitCoordinates.lng,
                hotspot_title: submitHotspotTitle.value,
                body: submitHotspotBody.value,
                poster_id: 1
            })
            setSubmitCoordinates([]);
            submitHotspotTitle.setValue("");
            submitHotspotBody.setValue("");
            setSubmitted(true);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="hotSpotContainer">
            <div className="hotSpotMap">
                {getMap(info.lat, info.lng)}
            </div>
            <form className="hotSpotForm" onSubmit={handleSubmit}>
                <h1 className="hotSpotTitle">Hotspot Submission</h1>
                <p className="submitLat"><b>Latitude:</b> {submitCoordinates.lat}</p>
                <p className="submitLng"><b>Longitude:</b> {submitCoordinates.lng}</p>
                <input type="text" placeholder="Hotspot Title" {...submitHotspotTitle}/>
                <input type="text" placeholder="Type a Description" {...submitHotspotBody}/>
                <input type="submit"/>
                {submitted ? (
                    <p className="success">Submission Complete</p>
                ): null}
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