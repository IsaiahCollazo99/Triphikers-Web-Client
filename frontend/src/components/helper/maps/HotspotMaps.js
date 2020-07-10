import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
let apiKey = "AIzaSyA0vq8MgHI_qpQ45Ug8ZyOPCoIEtk5MjjM";

const libraries = ["places"];
const mapContainerStyle = {
    width: "50vw",
    height: "40vh",
}

const HotspotMap = ({ location }) => {
    const [markers, setMarkers] = useState([]);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries,
    });



    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading maps";

    return(
        <div className="googleMaps">
            <h1 className="mapTitle">Hotspots <span role="img" aria-label="pin">📍</span></h1>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={13} center={location} onClick={(e) => {setMarkers(current=>[...current, {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
            }])}}>
                {markers.map((marker, index) => <Marker key = {index} position={{ lat: marker.lat, lng: marker.lng }}/>)}
            </GoogleMap>
        </div>
    )
}

export default HotspotMap;