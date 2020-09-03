import React, { useState, useEffect} from "react";
// import { createClient } from 'pexels';
import PopulateLocationSelect from "../helper/populateLocationSelect";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../../css/locations/LocationSearch.css";
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
// const client = createClient('563492ad6f9170000100000153f28b06267f4b548fc99fbb457455db');

const LocationSearch = (id) => {
    const [allCountries, setAllCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [loadCityFilter, setLoadCityFilter] = useState(false);
    const history = useHistory();
    const locationRedirect = (country, city, lat, lng) => {
        history.push({
            pathname: `/location/${country}/${city}/hotspots`,
            state: { city: city, country: selectedCountry, coordinates: {lat: lat, lng: lng} }}
        );
    }


    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: REACT_APP_GOOGLEAPIKEY,
        libraries,
    });

    const fetchFilters = async () => {
        try {
            console.log(loadCityFilter);
            let countries = await axios.get(`https://restcountries.eu/rest/v2/all`);
            setAllCountries(countries.data);
        } catch (error) {
            console.log(error);
        }
    }

    const filterCity = (e) => {
        e.preventDefault();
        setSelectedCountry(e.target.value);
        setLoadCityFilter(true);
    }

    const Search = ({ selectedCountry, locationRedirect}) => {
        const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
            requestOptions: {
                types: ['(cities)'],
                componentRestrictions: {country: selectedCountry}
            }
        })

        const [ error, setError ] = useState(null);

        const handleSelect = ( address ) => {
            setValue(address, false);
            clearSuggestions();
        }

        const handleInput = ( e ) => {
            setValue(e.target.value);
        }

        const handleSubmit = async  () => {
            if(value && selectedCountry) {
                try {
                    const res = await getGeocode({ address: value });
                    const { lat, lng } = await getLatLng(res[0]);
                    locationRedirect(selectedCountry, value, lat, lng)
                } catch(error) {
                    console.log(error)
                }
            } else {
                setError("You Must Choose a Country and City");
            }
        }
        
        return(
            <div className="searchContainer">
                <div className="searchResults">
                    {error ? <p className="error">{error}</p> : null}
                    <label htmlFor="searchInput"><b>Select a City: </b></label>
                    <Combobox onSelect={handleSelect} >
                        <ComboboxInput className="searchInput" value={value} onChange={handleInput} 
                        disabled={!ready || selectedCountry === ''} placeholder="Search A City"/>
                        <ComboboxPopover>
                            <ComboboxList>
                                {status === "OK" && data.map(({description}, index) => <ComboboxOption key={index} value={description.split(",")[0]} className="searchResults"/> )}
                            </ComboboxList>
                        </ComboboxPopover>
                    </Combobox>
                </div>
                <button onClick={handleSubmit}>Go There</button>
            </div>
        )
    }
    
    useEffect(() => {
        fetchFilters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading maps";

    return (
        <div className="searchCity">
            <label className="selectedCountry">
                <b>Select a Country:</b>
                <select className="selectedCountry" onChange={filterCity}>
                    <option ion="true" hidden>Select A Country</option>
                    <PopulateLocationSelect list={allCountries}/>
                </select>
            </label>
            {isLoaded !== '' ? <Search selectedCountry={selectedCountry} locationRedirect={locationRedirect}/> : null }
        </div>
    )
}

export default LocationSearch;