import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import gspIcon from "../../../images/gps.png"
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";
let apiKey = "AIzaSyA0vq8MgHI_qpQ45Ug8ZyOPCoIEtk5MjjM";

const libraries = ["places"];
const mapContainerStyle = {
    width: "50vw",
    height: "40vh",
}

const AttractionsMap = ({ location, fetchData }) => {
    const [address, setAddress] = useState([]);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries,
    });

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(16);
    } , []);

    useEffect(() => {
        if(address.length > 0 ) {
            fetchData({
                address: address
            });
        }
    }, [address, fetchData])
    
    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading maps";
    

    return(
        <div className="googleMaps">
            <div className="attractionTitle">
                <h1 className="mapTitle">Attractions <span role="img" aria-label="pin"> 📸</span></h1>
                <Locate panTo={panTo}/>
            </div>
            <Search  panTo={panTo} location={location} setAddress={setAddress}/>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={11} center={location} onLoad={onMapLoad}/>
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

const Search = ({panTo, location, setAddress}) => {
    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => location.lat, lng: () => location.lng },
            radius:  10 * 1000,
        }
    })
    return(
        <div className="search">
            <Combobox onSelect={async (address) => {
                setValue(address, false);
                clearSuggestions();
                    try {
                        setAddress(address); //add driving directions here
                        const res = await getGeocode({address});
                        const { lat, lng } = await getLatLng(res[0]);
                        panTo({ lat, lng });
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