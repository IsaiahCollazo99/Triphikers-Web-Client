import React, { useState, useEffect} from "react";
import { createClient } from 'pexels';
import PopulateLocationSelect from "../helper/populateLocationSelect";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../../css/LocationSearch.css";
import { useLoadScript } from '@react-google-maps/api';
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
require("dotenv").config()

const {
    REACT_APP_GOOGLEAPIKEY
} = process.env;
const libraries = ["places"];
const client = createClient('563492ad6f9170000100000153f28b06267f4b548fc99fbb457455db');

const LocationSearch = (id) => {
    const [allCountries, setAllCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const history = useHistory();
    const locationRedirect = (country, city, lat, lng) => history.push({
        pathname: `/location/${country}/${city}/hotspots`,
        state: { city: city, country: selectedCountry, coordinates: {lat: lat, lng: lng} }}
        );


    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: REACT_APP_GOOGLEAPIKEY,
        libraries,
    });

    const fetchFilters = async () => {
        try {
            let countries = await axios.get(`https://restcountries.eu/rest/v2/all`);
            setAllCountries(countries.data);
        } catch (error) {
            console.log(error);
        }
    }

    const filterCity = (e) => {
        e.preventDefault();
        setSelectedCountry(e.target.value);
    }

    const Search = ({ selectedCountry, locationRedirect}) => {
        const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
            requestOptions: {
                types: ['(cities)'],
                componentRestrictions: {country: selectedCountry}
            }
        })
        return(
            <div className="searchContainer">
                <label htmlFor="searchInput">Select a City: </label>
                <Combobox onSelect={async (address) => {
                    setValue(address, false);
                    clearSuggestions();
                        try {
                            const res = await getGeocode({address});
                            const { lat, lng } = await getLatLng(res[0]);
                            locationRedirect(selectedCountry, address, lat, lng)
                        } catch(error) {
                            console.log(error)
                        }
                    }}>
                    <ComboboxInput className="searchInput" value={value} onChange={(e)=>{setValue(e.target.value)
                    }} disabled={!ready} placeholder="Search A City"/>
                    <ComboboxPopover>
                        <ComboboxList>
                            {status === "OK" && data.map(({description }, index) => <ComboboxOption key={index} value={description} className="searchResults"/>)}
                        </ComboboxList>
                    </ComboboxPopover>
                </Combobox>
            </div>
        )
    }
    
    useEffect(() => {
        fetchFilters();
    }, []);

    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading maps";

    return (
        <div className="searchCity">
            <label htmlFor="selectedCountry">Select a Country: </label>
            <select className="selectedCountry" onChange={filterCity}>
                <option hidden>Select A Country</option>
                <PopulateLocationSelect list={allCountries}/>
            </select>
            {selectedCountry !== '' ? <Search selectedCountry={selectedCountry} locationRedirect={locationRedirect}/> : null }
        </div>
    )
}

export default LocationSearch;