import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import gspIcon from "../../../images/gps.png"

let apiKey = "AIzaSyA0vq8MgHI_qpQ45Ug8ZyOPCoIEtk5MjjM";

const libraries = ["places"];
const mapContainerStyle = {
    width: "50vw",
    height: "40vh",
}

const AttractionsMap = ({ location, zoom }) => {
    // const [address, setAddress] = useState([]);
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

    // useEffect(() => {
    //     if(location.length > 0 ) {
    //         setCoord(location)
    //     }
    // }, [Search])
    
    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading maps";
    

    return(
        <div className="googleMaps">
                {/* <Locate panTo={panTo}/> */}
            {/* <Search  panTo={panTo} location={location} setAddress={setAddress}/> */}
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={zoom} center={location} onLoad={onMapLoad}>
                <Marker position={{ lat: parseFloat(location.lat), lng: parseFloat(location.lng) }}/>
            </GoogleMap>
        </div>
    )
}

const Locate = ({panTo}) => {
    return(
        <div className="findMe">
            <p><b>Find Me:</b></p>
            <img className="gpsIcon" src={gspIcon} alt="locate me" onClick={() => {
                navigator.geolocation.getCurrentPosition((position) => {
                    panTo({ lat: position.coords.latitude, lng: position.coords.longitude})
                }, () => null)
            }}/>
        </div>
    )
}



export default AttractionsMap;