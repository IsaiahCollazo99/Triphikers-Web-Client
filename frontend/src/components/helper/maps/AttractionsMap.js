import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import gspIcon from "../../../images/FindMeIcon.svg"
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
    

    const panTo = React.useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(16);
    } , []);
    
    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading maps";
    

    return(
        <div className="googleMaps">
            <h1 className="mapTitle">Attractions <span role="img" aria-label="pin"> 📸</span></h1>

            <Search  panTo={panTo} markers={location}/>
            <Locate panTo={panTo}/>

            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={11} center={location} onClick={(e) => {setMarkers({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
            })}} onLoad={onMapLoad}>

                <Marker position={{ lat: parseFloat(markers.lat), lng: parseFloat(markers.lng) }}/>
            </GoogleMap>
        </div>
    )
}

const Locate = ({panTo}) => {
    return(
        <button className="locateMeButton" onClick={() => {
            navigator.geolocation.getCurrentPosition((position) => {
                panTo({ lat: position.coords.latitude, lng: position.coords.longitude})
            }, () => null)
        }}>
            <img className="gpsImg" src={gspIcon} alt="locate me"/>
        </button>
    )
}

const Search = ({panTo, markers}) => {
    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => markers.lat, lng: () => markers.lng },
            radius:  10 * 1000,
        }
    })
    return(
        <div className="search">
            <Combobox onSelect={async (address) => {
                setValue(address, false);
                clearSuggestions();
                    try {
                        const res = await getGeocode({address});
                        const { lat, lng } = await getLatLng(res[0]);
                        console.log(address) //add driving directions here
                        panTo({ lat, lng })
                    } catch(error) {
                        console.log(error)
                    }
                }}>
                <ComboboxInput className="searchInput" value={value} onChange={(e)=>{
                    setValue(e.target.value)
                }} disabled={!ready} placeholder="Search An Attraction"/>
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" && data.map(({description }, index) => <ComboboxOption key={index} value={description} className="searchResults"/>)}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    )
}

export default AttractionsMap;