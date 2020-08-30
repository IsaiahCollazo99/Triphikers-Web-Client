import React, { useEffect, useState } from 'react';
import { useInput } from '../../util/customHooks';
import { FaSearch } from 'react-icons/fa';
import '../../css/tripsPage/tripsPageFilter.css';
import TripsPageAdvanced from './TripsPageAdvanced';
import { TextField, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const TripsPageFilter = ({ filterTrips }) => {
    const [ showAdvanced, setShowAdvanced ] = useState(false);
    const search = useInput("");
    const dateFrom = useInput("");
    const dateTo = useInput("");
    const budget = useInput("");
    const tripType = useInput("");
    const splitCosts = useInput("");
    const groupType = useInput("");
    const itinerary = useInput("");
    const accommodation = useInput("");

    const filters = {
        search, dateFrom, dateTo, budget, tripType, splitCosts, groupType, itinerary, accommodation
    }

    const filterValues = {
        destination: search.value,
        date_from: dateFrom.value, 
        date_to: dateTo.value, 
        budget: budget.value, 
        trip_type: tripType.value, 
        split_costs: splitCosts.value, 
        group_type: groupType.value,
        itinerary: itinerary.value,
        accommodation: accommodation.value
    }
    
    const handleSubmit = ( e ) => {
        e.preventDefault();
        filterTrips(filterValues, true);
    }

    useEffect(() => {
        if(!search.value) {
            filterTrips(null, false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <TextField 
                    label="Search" 
                    placeholder="Search a Destination" 
                    {...search} 
                    type="search"
                    variant="filled"
                    size="medium"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className="tpf-first"
                />

                <TextField
                    label="Date From"
                    type="date"
                    placeholder="yyyy-mm-dd"
                    variant="filled"
                    size="medium"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className="tpf-second"
                    {...dateFrom}
                />

                <TextField
                    label="Date From"
                    type="date"
                    placeholder="yyyy-mm-dd"
                    variant="filled"
                    size="medium"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className="tpf-third"
                    {...dateTo}
                />

                <Button 
                    color="primary" 
                    variant="contained" 
                    style={{'fontSize': '32px'}}
                    disableElevation
                    onClick={handleSubmit}
                >
                    <FaSearch />
                </Button>
            </form>

            <Button onClick={showFilters} variant="standard" color="secondary" className="tpf-show">
                {isShown}
            </Button>

            <TripsPageAdvanced filterTrips={filterTrips} isHidden={isHidden} filters={filters} />
        </section>
    )
}

export default TripsPageFilter;