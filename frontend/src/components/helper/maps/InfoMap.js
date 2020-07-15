import React from 'react';
import { GoogleMap, useLoadScript} from '@react-google-maps/api';

const {
    REACT_APP_GOOGLEAPIKEY
} = process.env;
const libraries = ["places"];
const mapContainerStyle = {
    width: "18vw",
    height: "18vh",
}

const InfoMap = ({ location }) => {

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: REACT_APP_GOOGLEAPIKEY,
        libraries,
    });

    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading maps";

    return(
        <div className="googleMaps">
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={9} center={location}></GoogleMap>
        </div>
    )
}

export default InfoMap;