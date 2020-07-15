import React, { useEffect } from 'react';
import { useInput } from '../../util/customHooks';
import '../../css/tripsPage/tripsPageFilter.css';

const TripsPageFilter = ({ filterTrips }) => {
    const search = useInput("");
    
    const handleSubmit = ( e ) => {
        e.preventDefault();
        filterTrips(search.value);
    }

    useEffect(() => {
        if(!search.value) {
            filterTrips(null);
        }
    }, [search.value])
    
    return (
        <form className="tp-filter" onSubmit={handleSubmit}>
            <input type="search" {...search} />
            <input type="submit" value="Search" />  
        </form>
    )
}

export default TripsPageFilter;