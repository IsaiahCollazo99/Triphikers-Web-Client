import React, { useState, useEffect} from "react";
import axios from "axios";
import "../../css/LocationSearch.css";
import PopulateLocationSelect from '../helper/populateLocationSelect';
import CreateTripCitySearch from "./CreateTripCitySearch";
import { useLoadScript } from "@react-google-maps/api";
import { 
    InputLabel, 
    Select, 
    FormHelperText, 
    FormControl
} from '@material-ui/core';

const {
    REACT_APP_GOOGLEAPIKEY
} = process.env;
const libraries = ["places"];

const CreateTripDestination = ({ destination }) => {
    const { setDestination } = destination;
    const [ allCountries, setAllCountries ] = useState([]);
    const [ selectedCountry, setSelectedCountry ] = useState('');
    
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
        <section className="ct-destination">
            <FormControl>
                <InputLabel shrink id="country">Select a Country (optional filter)</InputLabel>
                <Select 
                    native
                    labelId="country" 
                    displayEmpty 
                    value={selectedCountry} 
                    onChange={filterCity}
                    variant="standard"
                >
                    <option value="" disabled>Select a Country</option>
                    <PopulateLocationSelect list={allCountries} />
                </Select>
                <FormHelperText>Select a country to filter the city list</FormHelperText>
            </FormControl>

            { isLoaded ? 
                <CreateTripCitySearch selectedCountry={selectedCountry} destination={destination.destination} setDestination={setDestination} /> :
                null
            }
        </section>
    )
}

export default CreateTripDestination;