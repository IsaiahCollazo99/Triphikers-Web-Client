import React from "react";

const LocationSelect = ({ list }) => {

    const populateSelect = list.map((country, index) => {
        return (
            <option key={index} value={country.alpha2Code}>{country.name}</option>
        )
    })
    
    return(
        <>
            {populateSelect}
        </>
    )
}

export default LocationSelect;