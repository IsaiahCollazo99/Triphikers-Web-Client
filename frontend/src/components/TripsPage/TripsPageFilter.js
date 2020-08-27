import React, { useEffect } from 'react';
import { useInput } from '../../util/customHooks';
import { FaSearch } from 'react-icons/fa';
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
        } else {
            filterTrips(search.value);
        }
    }, [search.value])
    
    return (
        <section className="tp-filterContainer">
            <form className="tp-filter" onSubmit={handleSubmit}>
                <input type="search" {...search} placeholder="Search a Destination" />
                <button type="submit"><FaSearch /></button>
            </form>

            <button className="tpf-show">Show Filters</button>

            <section className="tpf-advanced">
                <section className="tpf-dates">
                    <label>
                        <p>Date From: </p>
                        <input type="date" />
                    </label>

                    <label>
                        <p>Date To: </p>
                        <input type="date" />
                    </label>
                </section>

                <label>
                    <p>Budget: </p>
                    <select>

                    </select>
                </label>

                <label>
                    <p>Trip Type: </p>
                    <select>

                    </select>
                </label>

                <label>
                    <p>Split Costs: </p>
                    <select>

                    </select>
                </label>

                <label>
                    <p>Group Type: </p>
                    <select>
                        
                    </select>
                </label>
            </section>
        </section>
    )
}

export default TripsPageFilter;