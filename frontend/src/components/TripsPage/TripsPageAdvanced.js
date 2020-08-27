import React from 'react';

const TripsPageAdvanced = ({ filterTrips, isHidden }) => {
    return (
        <section className={`tpf-advanced ${isHidden}`}>
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
    )
}

export default TripsPageAdvanced;