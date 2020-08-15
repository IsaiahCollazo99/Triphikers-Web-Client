import React, { useState, useEffect } from "react";
import AttractionsMap from "../helper/maps/AttractionsMap";
import "../../css/locations/LocationAttractions.css";
import { useLoadScript } from '@react-google-maps/api';
import gspIcon from "../../images/gps.png";
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
  
const {
    REACT_APP_GOOGLEAPIKEY
} = process.env;
const libraries = ["places"];

const LocationAttractions = ({ city, coord, country }) => {
    const [address, setAddress] = useState([]);
    const [coordinates, setCoordinates] = useState([]);
    const [zoom, setZoom] = useState(11);
    const [locateMe, setLocateMe] = useState(null);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: REACT_APP_GOOGLEAPIKEY,
        libraries,
    });

    const Search = ({ coordinates, setAddress, setCoordinates, setZoom}) => {
        const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
            requestOptions: {
                location: { lat: () => parseFloat(coordinates.lat), lng: () => parseFloat(coordinates.lng) },
                radius:  25 * 1000,
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
                            setAddress(address);
                            setCoordinates({ lat, lng });
                            setZoom(16)
                        } catch(error) {
                            console.log(error)
                        }
                    }}>
                    <ComboboxInput className="searchInput" value={value} onChange={(e)=>{setValue(e.target.value);
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

    const Locate = ({ setCoordinates, setZoom, setLocateMe}) => {
        return(
            <div className="findMe">
                <p><b>Find Me:</b></p>
                <img className="gpsIcon" src={gspIcon} alt="locate me" onClick={() => {
                    navigator.geolocation.getCurrentPosition((position) => { setCoordinates({lat: position.coords.latitude, lng: position.coords.longitude}, setZoom(16), setLocateMe({lat: position.coords.latitude, lng: position.coords.longitude}))
                    }, () => null)
                }}/>
            </div>
        )
    }

    const getMap = (lat, lng, zoom = 11) => {
        if(lat !== undefined){
            let coordinates = {
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            }
            return(
                <AttractionsMap location={coordinates} zoom ={zoom}/>
            )
        }
    }

    useEffect(() => {
        if(coord !== undefined){
            setCoordinates({lat: coord.lat, lng: coord.lng})
        }
    }, [coord])

    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading maps";

    return (
        <div className="attractionsContainer">
            <div className="attractionMapContainer">
                <div className="attractionTitle">
                    <h1 className="mapTitle">Attractions <span role="img" aria-label="pin"> 📸</span></h1>
                    <Locate className="findMeButton" setCoordinates={setCoordinates} setZoom={setZoom} setLocateMe={setLocateMe}/>
                </div>
                <div className="attractionMap">
                    <Search coordinates={coordinates} setAddress={setAddress} setCoordinates={setCoordinates} setZoom={setZoom}/>
                    {getMap(coordinates.lat, coordinates.lng, zoom)}
                </div>
            </div>
            <div className="attractionInfo">
                <div className="selectedAttraction">
                {address.length ? (
                        <div className="attraction">
                            <h1 className="attractionSelectedTitle">Selected Attraction</h1>
                            <p>{address}</p>
                            <p className="directions" onClick={() => window.open( `https://www.google.com/maps/dir/?api=1&destination=${address}&travelmode=driving`)}><b>Click Here for Directions</b></p>
                        </div>
                    ) : null}
                </div>
                <div className="yourLocation">
                {locateMe ? (
                        <div className="location">
                            <h1 className="locationTitle">Your GPS Location</h1>
                            <p className="locationLat"><b>Latitude:</b> {locateMe.lat}</p>
                            <p className="locationLat"><b>Longitude:</b> {locateMe.lng}</p>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default LocationAttractions;