import React from 'react';
import { GoogleMap, useLoadScript} from '@react-google-maps/api';
let apiKey = "AIzaSyA0vq8MgHI_qpQ45Ug8ZyOPCoIEtk5MjjM";

const libraries = ["places"];
const mapContainerStyle = {
    width: "18vw",
    height: "18vh",
}

const InfoMap = ({ location }) => {

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: apiKey,
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