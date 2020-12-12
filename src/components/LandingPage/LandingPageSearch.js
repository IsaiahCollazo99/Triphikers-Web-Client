import React, { useState, useEffect} from "react";
import PopulateLocationSelect from "../helper/populateLocationSelect";
import axios from "axios";
import CustomTextField from '../General/CustomTextField';
import { useLoadScript } from "@react-google-maps/api";
import LandingPageCitySearch from "./LandingPageCitySearch";
require("dotenv").config()

const {
    REACT_APP_GOOGLEAPIKEY
} = process.env;
const libraries = ["places"];

const LandingPageSearch = () => {
    const [allCountries, setAllCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');

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

    const filterCity = (e) => {
        e.preventDefault();
        setSelectedCountry(e.target.value);
    }
    
    useEffect(() => {
        fetchFilters();
    }, []);

    return (
        <div className="landingSearchCity">
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
                <LandingPageCitySearch selectedCountry={selectedCountry} /> :
                null
            }
        </div>
    )
}

export default LandingPageSearch;