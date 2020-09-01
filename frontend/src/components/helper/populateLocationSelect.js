import React from "react";
import { MenuItem } from '@material-ui/core';

const PopulateLocationSelect = ({ list }) => {

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

export default PopulateLocationSelect;