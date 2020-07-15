import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
// import gspIcon from "../../../images/gps.png"

let apiKey = "AIzaSyA0vq8MgHI_qpQ45Ug8ZyOPCoIEtk5MjjM";

const libraries = ["places"];
const mapContainerStyle = {
    width: "50vw",
    height: "40vh",
}

const AttractionsMap = ({ location, zoom }) => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries,
    });

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    // const panTo = React.useCallback(({lat, lng}) => {
    //     mapRef.current.panTo({lat, lng});
    //     mapRef.current.setZoom(16);
    // } , []);
    
    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading maps";
    

    return(
        <div className="googleMaps">
                {/* <Locate panTo={panTo}/> */}
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={zoom} center={location} onLoad={onMapLoad}>
                <Marker position={{ lat: parseFloat(location.lat), lng: parseFloat(location.lng) }}/>
            </GoogleMap>
        </div>
    )
}



export default AttractionsMap;