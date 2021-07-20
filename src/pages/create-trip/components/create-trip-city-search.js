import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import usePlacesAutocomplete from "use-places-autocomplete";

import CustomTextField from '../custom-components/custom-text-field';

const CreateTripCitySearch = ({ selectedCountry, setDestination }) => {

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
        setDestination(e.target.innerText);
    }
    
    return(
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
    )
}

export default CreateTripCitySearch;