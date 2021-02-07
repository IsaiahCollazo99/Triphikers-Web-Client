import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthContext';
import { getUserById } from '../../util/apiCalls/getRequests';
import CustomTextField from '../General/CustomTextField';

const TripsPageAdvanced = ({ isHidden, filters }) => {
    const { currentUser } = useContext(AuthContext);
    const [ userGender, setUserGender ] = useState(null);
    const { budget, tripType, splitCosts, groupType, itinerary, accommodation } = filters;

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
            <CustomTextField 
                label="Budget"
                select
                variant="outlined"
                helperText="How much money will you spend?"
                SelectProps={{
                    native: true,
                }}
                InputLabelProps={{
                    shrink: true,
                }}
                {...budget}
            >
                <option value="" disabled>Select a Budget</option>
                <option value="none">No preference</option>
                <option value="Budget ($0 - $999)">Budget ($0 - $999)</option>
                <option value="Average ($1000 - $1999)">Average ($1000 - $1999)</option>
                <option value="Luxury ($2000+)">Luxury ($2000+)</option>
            </CustomTextField>

            <CustomTextField 
                label="Trip Type"
                select
                variant="outlined"
                helperText="How do you want to spend your time?"
                SelectProps={{
                    native: true,
                }}
                InputLabelProps={{
                    shrink: true,
                }}
                {...tripType}
            >
                <option value="" disabled>Select a Trip Type</option>
                <option value="none">No preference</option>
                <option value="Explore Cities">Explore Cities</option>
                <option value="Airport Layovers">Airport Layovers</option>
                <option value="Road Trip">Road Trip</option>
                <option value="Backpaking">Backpaking</option>
                <option value="Other">Other</option>
            </CustomTextField>

            <CustomTextField 
                label="Split Costs"
                select
                variant="outlined"
                helperText="Do you want to split costs with others?"
                SelectProps={{
                    native: true,
                }}
                InputLabelProps={{
                    shrink: true,
                }}
                {...splitCosts}
            >
                <option value="" disabled>Split Costs?</option>
                <option value="none">No preference</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </CustomTextField>

            <CustomTextField 
                label="Group Type"
                select
                variant="outlined"
                helperText="Who do you want to travel with?"
                SelectProps={{
                    native: true,
                }}
                InputLabelProps={{
                    shrink: true,
                }}
                {...groupType}
            >
                    <option value="" disabled>Select a Group Type</option>
                    <option value="none">No preference</option>
                    {getGroupTypeOptions()}
                    <option value="Any">Any</option>
            </CustomTextField>

            <CustomTextField 
                label="Itinerary"
                select
                variant="outlined"
                helperText="How strict of an itinerary do you want?"
                SelectProps={{
                    native: true,
                }}
                InputLabelProps={{
                    shrink: true,
                }}
                {...itinerary}
            >   
                <option value="" disabled>Select An Itinerary Type</option>
                <option value="none">No preference</option>
                <option value="Set">Set</option>
                <option value="Flexible">Flexible</option>
                <option value="None">None</option>
            </CustomTextField>
            
            <CustomTextField 
                label="Accommodation"
                select
                variant="outlined"
                helperText="Where would you like to stay?"
                SelectProps={{
                    native: true,
                }}
                InputLabelProps={{
                    shrink: true,
                }}
                {...accommodation}
            >
                <option value="" disabled>Select an Accommodation</option>
                <option value="none">No preference</option>
                <option value="Camping">Camping</option>
                <option value="Couchsurf">CouchSurf</option>
                <option value="Home">Home</option>
                <option value="Hotel">Hotel</option>
                <option value="Hostel">Hostel</option>
                <option value="Other">Other</option>
            </CustomTextField>
        </section>
    )
}

export default TripsPageAdvanced;