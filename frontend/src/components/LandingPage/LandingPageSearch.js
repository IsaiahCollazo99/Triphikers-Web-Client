import React, { useState, useEffect} from "react";
import PopulateLocationSelect from "../helper/populateLocationSelect";
import "../../css/landingPage/landingPageSearch.css";
import axios from "axios";
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

const LandingPageSearch = (id) => {
    const [allCountries, setAllCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [loadCityFilter, setLoadCityFilter] = useState(false);


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
        setLoadCityFilter(true);
    }

    const Search = ({ selectedCountry }) => {
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
                } catch(error) {
                    console.log(error)
                }
            } else {
                setError("You Must Choose a Country and City");
            }
        }
        
        return(
            <div className="landingSearchContainer">
                <div className="landingSearchResults">
                    {error ? <p className="error">{error}</p> : null}
                    <label htmlFor="landingSearchInput"><b>Select a City: </b></label>
                    <Combobox onSelect={handleSelect} >
                        <ComboboxInput className="landingSearchInput" value={value} onChange={handleInput} 
                        disabled={!ready} disabled={selectedCountry === ''} placeholder="Search A City"/>
                        <ComboboxPopover>
                            <ComboboxList>
                                {status === "OK" && data.map(({description}, index) => <ComboboxOption key={index} value={description.split(",")[0]} className="searchResults"/> )}
                            </ComboboxList>
                        </ComboboxPopover>
                    </Combobox>
                </div>
            </div>
        )
    }
    
    useEffect(() => {
        fetchFilters();
    }, []);

    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading maps";

    return (
        <div className="landingSearchCity">
            <label className="landingSearchCountry">
                <b>Select a Country:</b>
                <select className="landingSearchCountry" onChange={filterCity}>
                    <option ion="true" hidden>Select A Country</option>
                    <PopulateLocationSelect list={allCountries}/>
                </select>
            </label>
            {isLoaded !== '' ? <Search selectedCountry={selectedCountry}/> : null }
        </div>
    )
}

export default LandingPageSearch;