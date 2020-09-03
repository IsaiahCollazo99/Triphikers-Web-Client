import React, { useState, useEffect} from "react";
import PopulateLocationSelect from "../helper/populateLocationSelect";
import axios from "axios";
import CustomTextField from '../General/CustomTextField';
import { useLoadScript } from "@react-google-maps/api";
import { useHistory } from "react-router-dom";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import LocationCitySearch from "./LocationCitySearch.js";
import "../../css/locations/LocationSearch.css";
require("dotenv").config()

const {
    REACT_APP_GOOGLEAPIKEY
} = process.env;
const libraries = ["places"];

const LandingPageSearch = () => {
    const [allCountries, setAllCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [city, setCity] = useState([]);
    const [error, setError] = useState(false);
    const history = useHistory();
    const locationRedirect = (country, city, lat, lng) => {
        history.push({
            pathname: `/location/${country}/${city}/hotspots`,
            state: { city: city, country: selectedCountry, coordinates: {lat: lat, lng: lng} }}
        );
    }

    const { isLoaded } = useLoadScript({
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

    const handleSubmit = async  () => {
        if(city && selectedCountry) {
            try {
                const res = await getGeocode({ address: city });
                const { lat, lng } = await getLatLng(res[0]);
                locationRedirect(selectedCountry, city, lat, lng)
            } catch(error) {
                console.log(error)
            }
        } else {
            setError("You Must Choose a Country and City");
        }
    }

    const filterCity = (e) => {
        e.preventDefault();
        setSelectedCountry(e.target.value);
    }
    
    useEffect(() => {
        fetchFilters();
    }, []);

    return (
        <div className="citySearchContainer">
            <label className="landingSearchCountry">
                <CustomTextField
                    select
                    label="Select a Country"
                    variant="outlined"
                    helperText="Where is your next adventure?"
                    style={{width: '98%'}}
                    SelectProps={{
                        native: true,
                    }}
                    InputLabelProps={{
                        shrink: true,
                        required: false
                    }}
                    value={selectedCountry} 
                    onChange={filterCity}
                    required
                >               
                    <option value="" disabled>Select a Country</option>
                    <PopulateLocationSelect list={allCountries} />
                </CustomTextField>
            </label>
            { isLoaded ? 
                <LocationCitySearch selectedCountry={selectedCountry} setCity={setCity} /> :
                null
            }
            <button onClick={handleSubmit}>Go There</button>
            {error !== false ? <p>{error}</p> : null}
        </div>
    )
}

export default LandingPageSearch;