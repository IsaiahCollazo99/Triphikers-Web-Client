import React, { useState, useEffect} from "react";
import PopulateLocationSelect from "../helper/populateLocationSelect";
// import "../../css/landingPage/landingPageSearch.css";
import axios from "axios";
import usePlacesAutocomplete from "use-places-autocomplete";
import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomTextField from '../General/CustomTextField';

const LandingPageSearch = (id) => {
    const [allCountries, setAllCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [loadCityFilter, setLoadCityFilter] = useState(false);

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

    const { suggestions: { data }, setValue } = usePlacesAutocomplete({
        requestOptions: {
            types: ['(cities)'],
            componentRestrictions: {country: selectedCountry}
        }
    })
    
    const handleInput = ( e ) => {
        setValue(e.target.value);
    }

    const handleSelect = ( e ) => {
        setValue(e.target.innerText, false);
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
                    helperText="Choose a Country first"
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
                <Autocomplete
                id="combo-box-demo"
                options={data}
                getOptionLabel={(option) => option.description}
                style={{ width: 300 }}
                renderInput={(params) => {
                    return (
                        <CustomTextField 
                            {...params} 
                            label="City"                         
                            InputLabelProps={{
                                shrink: true,
                                required: false
                            }} 
                            placeholder="Select a City"
                            required
                            helperText="Select your destination"
                            fullWidth
                            variant="outlined"
                            style={{width: '100%'}}
                        />
                    )
                }}
                onInputChange={handleInput}
                onChange={handleSelect}
                fullWidth
            />
        </div>
    )
}

export default LandingPageSearch;