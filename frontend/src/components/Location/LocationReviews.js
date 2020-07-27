import React, { useState, useEffect} from "react";
import PopulateLocationSelect from "../helper/populateLocationSelect";
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

  const {
    REACT_APP_GOOGLEAPIKEY
} = process.env;
const libraries = ["places"];

const LocationReviews = (id) => {
    const [allCountries, setAllCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [address, setAddress] = useState([]);
    const [coord, setCoord] = useState([]);

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

    const Search = ({ setAddress, setCoord, selectedCountry }) => {
        const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
            requestOptions: {
                types: ['(cities)'],
                componentRestrictions: {country: selectedCountry}
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
                            setCoord({ lat, lng });
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
        fetchFilters()
    }, []);

    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading maps";

    return (
        <div>
            Reviews
            <select className="selectedCountry" onChange={filterCity}>
                <option hidden>Select A Country</option>
                <PopulateLocationSelect list={allCountries}/>
            </select>
            {selectedCountry !== '' ? <Search setAddress={setAddress} setCoord={setCoord} selectedCountry={selectedCountry}/> : null }
        </div>
    )
}

export default LocationReviews;