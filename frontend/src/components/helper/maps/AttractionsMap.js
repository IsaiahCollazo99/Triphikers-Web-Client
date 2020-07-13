import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
    ComboboxOptionText,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";
import axios from "axios";
let apiKey = "AIzaSyA0vq8MgHI_qpQ45Ug8ZyOPCoIEtk5MjjM";

const libraries = ["places"];
const mapContainerStyle = {
    width: "50vw",
    height: "45vh",
}

const AttractionsMap = ({ location, fetchData }) => {
    const [markers, setMarkers] = useState([]);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries,
    });

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    useEffect(() => {
        if(markers.length === undefined ) {
            fetchData({
                coordinates: markers
            });
        }
    }, [markers, fetchData])
    
    
    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading maps";
    

    return(
        <div className="googleMaps">
            <h1 className="mapTitle">Attractions <span role="img" aria-label="pin"> 📸</span></h1>

            <Search markers={markers}/>

            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={location} onClick={(e) => {setMarkers({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
            })}} onLoad={onMapLoad}>

                <Marker position={{ lat: parseFloat(markers.lat), lng: parseFloat(markers.lng) }}/>
            </GoogleMap>
        </div>
    )
}

const Search = (markers) => {
    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => parseFloat(markers.lat), lng: () => parseFloat(markers.lng) },
            radius:  10 * 1000,
        }
    })
    return(
        <Combobox onSelect={ (address) => {console.log(address)} }>
            <ComboboxInput value={value} onChange={(e)=>{
                setValue(e.target.value)
            }} disabled={!ready} placeholder="Enter Attraction"/>
        </Combobox>
    )
}

export default AttractionsMap;