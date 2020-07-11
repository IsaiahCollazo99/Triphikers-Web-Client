import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from "axios";
let apiKey = "AIzaSyA0vq8MgHI_qpQ45Ug8ZyOPCoIEtk5MjjM";

const libraries = ["places"];
const mapContainerStyle = {
    width: "50vw",
    height: "50vh",
}

const HotspotMap = ({ location, fetchHotspotCoordinates }) => {
    const [markers, setMarkers] = useState([]);
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries,
    });

    const fetchMarkers = async () => {
        try {
            let res = await axios.get(`http://localhost:3001/api/hotspots`);
            showMarkers(res.data.hotspots)
        } catch (error) {
            console.log(error)
        }
    }

    const showMarkers = (allMarkers) => {
        if(allMarkers !== undefined){
            allMarkers.map((marker, index) => {
                return (
                    <Marker key={index} position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}/>
                )
            })
        }
    }

    useEffect(() => {
        fetchMarkers();
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
                {showMarkers()}
                <Marker position={{ lat: parseFloat(markers.lat), lng: parseFloat(markers.lng) }}/>
            </GoogleMap>
        </div>
    )
}

export default HotspotMap;