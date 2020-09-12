import React, { useState, useEffect} from "react";
import PopulateLocationSelect from "../helper/populateLocationSelect";
import axios from "axios";
import CustomTextField from '../General/CustomTextField';
import { useLoadScript } from "@react-google-maps/api";
import { useHistory } from "react-router-dom";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import LocationCitySearch from "./LocationCitySearch.js";
import Button from '@material-ui/core/Button';
// import { orange } from '@material-ui/core/colors';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import "../../css/locations/LocationSearch.css";
require("dotenv").config()

const useStyles = makeStyles((theme) => ({
    margin: {
    margin: theme.spacing(1),
    },
}));

const {
    REACT_APP_GOOGLEAPIKEY
} = process.env;
const libraries = ["places"];


const LocationSearch = () => {
    const [allCountries, setAllCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [city, setCity] = useState([]);
    const [error, setError] = useState(false);
    const history = useHistory();
    const classes = useStyles();
    
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
            setError("You must choose a country and city");
        }
    }

    const filterCity = (e) => {
        e.preventDefault();
        setSelectedCountry(e.target.value);
    }
    
    useEffect(() => {
        fetchFilters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="citySearchContainer">
            <div className="citySearchCard">
                <h1 className="citySearchTitle">Where to?</h1>
                <label className="citySearchCountry">
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
                <Button onClick={handleSubmit} variant="contained" color="primary" className={classes.margin} style={{maxWidth: '100%', maxHeight: '10%', minWidth: '50%', minHeight: '5%'}}> Explore </Button>
                {error !== false ? <p className="errorPrompt">{error}</p> : null}
            </div>
        </div>
    )
}

export default LocationSearch;