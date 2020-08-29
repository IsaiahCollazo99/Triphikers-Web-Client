import React from 'react';
import usePlacesAutocomplete from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const CreateTripCitySearch = ({ selectedCountry, destination, setDestination }) => {

    const { ready, value, suggestions: {status, data}, setValue } = usePlacesAutocomplete({
        requestOptions: {
            types: ['(cities)'],
            componentRestrictions: {country: selectedCountry}
        }
    })

    const handleInput = ( e ) => {
        setValue(e.target.value);
    }

    const handleSelect = ( val ) => {
        setValue(val, false);
        setDestination(val);
    }
    
    return(
        <label htmlFor="ct-city">
            <p>City: </p>
            <Combobox onSelect={handleSelect}>
                <ComboboxInput value={destination ? destination : value} onChange={handleInput} disabled={!ready}
                placeholder="Input A City" name="ct-city" autoComplete="off" required/>
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" && 
                            data.map(({ description }, index) => {
                                return (
                                    <ComboboxOption 
                                        key={index} 
                                        value={description} 
                                    />
                                )
                        })}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </label>

    )
}

export default CreateTripCitySearch;