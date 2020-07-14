import React from 'react';
import '../../css/tripsPage/tripsPageFilter.css';

const TripsPageFilter = () => {
    return (
        <div className="tp-filter">
            <label for="destination">
                Destination: 
                <select defaultValue="" name="destination">
                    <option value="" disabled>Destination</option>
                </select>
            </label>

            <label for="gender">
                Gender: 
                <select defaultValue="" name="gender">
                    <option value="" disabled>Gender</option>
                </select>
            </label>

            <label for="age">
                Age: 
                <select defaultValue="" name="age">
                    <option value="" disabled>Age</option>
                </select>
            </label>

            <label for="splitCosts">
                Split Costs: 
                <select defaultValue="" name="splitCosts">
                    <option value="" disabled>Split Costs</option>
                </select>
            </label>

            <label for="budget">
                Budget: 
                <select defaultValue="" name="budget">
                    <option value="" disabled>Budget</option>
                </select>
            </label>

            <label for="tripType">
                Trip Type: 
                <select defaultValue="" name="tripType">
                    <option value="" disabled>Trip Type</option>
                </select>
            </label>
        </div>
    )
}

export default TripsPageFilter;