import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
let apiKey = "AIzaSyA0vq8MgHI_qpQ45Ug8ZyOPCoIEtk5MjjM";

const libraries = ["places"];
const mapContainerStyle = {
    width: "50vw",
    height: "40vh",
}

const HotspotMap = ({ location, fetchHotspotCoordinates }) => {
    const [markers, setMarkers] = useState([]);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries,
    });

    useEffect(() => {
        if(markers.length === undefined ) {
            fetchHotspotCoordinates(markers);
        }
    }, [markers])
    
    
    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading maps";
    

    return(
        <div className="googleMaps">
            <h1 className="mapTitle">Hotspots <span role="img" aria-label="pin">📍</span></h1>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={13} center={location} onClick={(e) => {setMarkers({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
            })}}>
                <Marker position={{ lat: Number(markers.lat), lng: Number(markers.lng) }}/>
            </GoogleMap>
        </div>
    )
}

export default HotspotMap;