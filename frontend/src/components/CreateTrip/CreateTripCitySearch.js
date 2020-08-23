import React from 'react';
import { useLoadScript } from '@react-google-maps/api';
import usePlacesAutocomplete from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useEffect } from 'react';

const CreateTripCitySearch = ({ selectedCountry, setDestination }) => {

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

    useEffect(() => {
        if(value !== "") debugger;
    }, [value])
    
    return(
        <label htmlFor="ct-city">
            <Combobox onSelect={handleSelect}>
                <ComboboxInput value={value} onChange={handleInput} disabled={!ready}
                placeholder="Input A City" name="ct-city"/>
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