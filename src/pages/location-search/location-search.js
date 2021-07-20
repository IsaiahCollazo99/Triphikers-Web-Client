import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import usePlacesAutocomplete from "use-places-autocomplete";

import CustomTextField from '../custom-components/custom-text-field/custom-text-field';

const LocationCitySearch = ({ selectedCountry, setCity }) => {
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
        setCity(e.target.innerText);
    }
    
    return(
        <Autocomplete
            id="combo-box-demo"
            options={data}
            getOptionLabel={(option) => option.description}
            style={{ width: 420 }}
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
                        helperText="Where is the city of your dreams?"
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
    )
}

export default LocationCitySearch;