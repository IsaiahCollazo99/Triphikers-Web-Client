import React, { useEffect, useState } from 'react';
import { useInput } from '../../util/customHooks';
import { FaSearch } from 'react-icons/fa';
import '../../css/tripsPage/tripsPageFilter.css';
import TripsPageAdvanced from './TripsPageAdvanced';

const TripsPageFilter = ({ filterTrips }) => {
    const [ showAdvanced, setShowAdvanced ] = useState(false);
    const search = useInput("");
    const dateFrom = useInput("");
    const dateTo = useInput("");
    const budget = useInput("");
    const tripType = useInput("");
    const splitCosts = useInput("");
    const groupType = useInput("");

    const filters = {
        search, dateFrom, dateTo, budget, tripType, splitCosts, groupType
    }

    const filterValues = {
        destination: search.value,
        date_from: dateFrom.value, 
        date_to: dateTo.value, 
        budget: budget.value, 
        trip_type: tripType.value, 
        split_costs: splitCosts.value, 
        group_type: groupType.value
    }
    
    const handleSubmit = ( e ) => {
        e.preventDefault();
        filterTrips(filterValues, true);
    }

    useEffect(() => {
        if(!search.value) {
            filterTrips(null, false);
        }
    }, [search.value])

    const showFilters = () => {
        if(showAdvanced === true) {
            filterTrips(null, false);
        }
        setShowAdvanced((prevState) => {
            return !prevState;
        });
    }

    const isHidden = showAdvanced ? "tpf-shown" : "tpf-hidden";
    const isShown = showAdvanced ? "Hide Filters" : "Show Filters";
    
    return (
        <section className="tp-filterContainer">
            <form className="tp-filter" onSubmit={handleSubmit}>
                <input type="search" {...search} placeholder="Search a Destination" />
                <button type="submit"><FaSearch /></button>
            </form>

            <button className="tpf-show" onClick={showFilters}>{isShown}</button>

            <TripsPageAdvanced filterTrips={filterTrips} isHidden={isHidden} filters={filters} />
        </section>
    )
}

export default TripsPageFilter;