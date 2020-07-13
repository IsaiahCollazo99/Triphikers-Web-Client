import React, { useState } from "react";
import AttractionsMap from "../helper/maps/AttractionsMap";

const LocationAttractions = ({info}) => {
    const [submitCoordinates, setSubmitCoordinates] = useState([]);

    const fetchData = (data) => {
        setSubmitCoordinates(data.coordinates);
    }

    const getMap = (lat, lng) => {
        if(lat !== undefined){
            let coordinates = {
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            }
            return(
                <AttractionsMap location={coordinates} fetchData={fetchData}/>
            )
        }
    }

    return (
        <div className="attractionsContainer">
            <div className="attractionMap">
                {getMap(info.lat, info.lng)}
            </div>
        </div>
    )
}

export default LocationAttractions;