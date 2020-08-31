import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthContext';
import { getUserById } from '../../util/apiCalls/getRequests';

const TripsPageAdvanced = ({ isHidden, filters }) => {
    const { currentUser } = useContext(AuthContext);
    const [ userGender, setUserGender ] = useState(null);
    const { dateFrom, dateTo, budget, tripType, splitCosts, groupType } = filters;

    const getUserGender = async () => {
        try {
            const data = await getUserById(currentUser.id);
            setUserGender(data.user.gender);
        } catch ( error ) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserGender();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getGroupTypeOptions = () => {
        if(userGender === 'Male') {
            return <option value="Only Men">Men Only</option>
        } else if(userGender === 'Female') {
            return <option value="Only Women">Women Only</option>
        } else if (userGender === 'Non-Binary') {
            return <option value="Only Non-Binary">Non-Binary Only</option>
        } else {
            return null;
        }
    }
    
    return (
        <section className={`tpf-advanced ${isHidden}`}>
            <section className="tpf-dates">
                <label>
                    <p>Date From: </p>
                    <input type="date" {...dateFrom} />
                </label>

                <label>
                    <p>Date To: </p>
                    <input type="date" {...dateTo} />
                </label>
            </section>

            <label>
                <p>Budget: </p>
                <select {...budget}>
                    <option value="" disabled>Select a Budget</option>
                    <option value="none">No preference</option>
                    <option value="Budget ($0 - $999)">Budget ($0 - $999)</option>
                    <option value="Average ($1000 - $1999)">Average ($1000 - $1999)</option>
                    <option value="Luxury ($2000+)">Luxury ($2000+)</option>
                </select>
            </label>

            <label>
                <p>Trip Type: </p>
                <select {...tripType}>
                    <option value="" disabled>Select a Trip Type</option>
                    <option value="none">No preference</option>
                    <option value="Explore Cities">Explore Cities</option>
                    <option value="Airport Layovers">Airport Layovers</option>
                    <option value="Road Trip">Road Trip</option>
                    <option value="Backpacking">Backpacking</option>
                    <option value="Other">Other</option>
                </select>
            </label>

            <label>
                <p>Split Costs: </p>
                <select {...splitCosts}>
                    <option value="" disabled>Split Costs?</option>
                    <option value="none">No preference</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </label>

            <label>
                <p>Group Type: </p>
                <select {...groupType}>
                    <option value="" disabled>Select a Group Type</option>
                    <option value="none">No preference</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    {getGroupTypeOptions()}
                    <option value="Any">Any</option>
                </select>
            </label>
        </section>
    )
}

export default TripsPageAdvanced;