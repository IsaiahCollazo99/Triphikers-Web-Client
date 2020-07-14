import React, { useState } from "react";
import AttractionsMap from "../helper/maps/AttractionsMap";
import "../../css/locations/LocationAttractions.css";

const LocationAttractions = ({info}) => {
    const [address, setAddress] = useState([])

    const fetchData = (data) => {
        setAddress(data.address);
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
            <div className="selectedAttraction">
            {address.length ? (
                    <div className="attraction">
                        <h1 className="attractionSelectedTitle">Selected Attraction</h1>
                        <p>{address}</p>
                        <p className="directions" onClick={() => window.open( `https://www.google.com/maps/dir/?api=1&destination=${address}&travelmode=driving`)}><b>Click Here for Directions</b></p>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default LocationAttractions;