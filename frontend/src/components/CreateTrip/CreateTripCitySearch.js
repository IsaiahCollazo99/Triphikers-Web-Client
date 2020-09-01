import React from 'react';
import usePlacesAutocomplete from "use-places-autocomplete";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, FormControl } from '@material-ui/core'

const CreateTripCitySearch = ({ selectedCountry, setDestination }) => {

    const { ready, value, suggestions: {status, data}, setValue } = usePlacesAutocomplete({
        requestOptions: {
            types: ['(cities)'],
            componentRestrictions: {country: selectedCountry}
        }
    })

    const handleInput = ( e ) => {
        console.log({ready, value, status, data});
        setValue(e.target.value);
    }

    const handleSelect = ( e ) => {
        setValue(e.target.innerText, false);
        setDestination(e.target.innerText);
    }
    
    return(
        <FormControl>
            <Autocomplete
                id="combo-box-demo"
                options={data}
                getOptionLabel={(option) => option.description}
                style={{ width: 300 }}
                renderInput={(params) => {
                    return (
                        <TextField 
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
        </FormControl>
    )
}

export default CreateTripCitySearch;