import React, { useEffect, useState } from 'react';
import { useInput } from '../../util/customHooks';
import { FaSearch } from 'react-icons/fa';
import '../../css/tripsPage/tripsPageFilter.css';
import TripsPageAdvanced from './TripsPageAdvanced';

const TripsPageFilter = ({ filterTrips }) => {
    const [ showAdvanced, setShowAdvanced ] = useState(false);
    const search = useInput("");
    
    const handleSubmit = ( e ) => {
        e.preventDefault();
        filterTrips(search.value);
    }

    useEffect(() => {
        if(!search.value) {
            filterTrips(null);
        } else {
            filterTrips(search.value);
        }
    }, [search.value])

    const showFilters = () => {
        setShowAdvanced((prevState) => {
            return !prevState;
        });
    }

    const isHidden = showAdvanced ? "tpf-shown" : "tpf-hidden";
    
    return (
        <section className="tp-filterContainer">
            <form className="tp-filter" onSubmit={handleSubmit}>
                <input type="search" {...search} placeholder="Search a Destination" />
                <button type="submit"><FaSearch /></button>
            </form>

            <button className="tpf-show" onClick={showFilters}>Show Filters</button>

            <TripsPageAdvanced filterTrips={filterTrips} isHidden={isHidden} />
        </section>
    )
}

export default TripsPageFilter;