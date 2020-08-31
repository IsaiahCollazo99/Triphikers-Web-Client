import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthContext';
import { getUserById } from '../../util/apiCalls/getRequests';
import { InputLabel, Select, MenuItem, FormHelperText, FormControl } from '@material-ui/core';

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
            return <MenuItem value="Only Men">Men Only</MenuItem>
        } else if(userGender === 'Female') {
            return <MenuItem value="Only Women">Women Only</MenuItem>
        } else if (userGender === 'Non-Binary') {
            return <MenuItem value="Only Non-Binary">Non-Binary Only</MenuItem>
        } else {
            return null;
        }
    }
    
    return (
        <section className={`tpf-advanced ${isHidden}`}>
            <FormControl>
                <InputLabel shrink id="tpf-budget">Budget</InputLabel>
                <Select labelId="tpf-budget" {...budget} color="secondary" displayEmpty>
                    <MenuItem value="" disabled>Select a Budget</MenuItem>
                    <MenuItem value="none"><em>No preference</em></MenuItem>
                    <MenuItem value="Budget ($0 - $999)">Budget ($0 - $999)</MenuItem>
                    <MenuItem value="Average ($1000 - $1999)">Average ($1000 - $1999)</MenuItem>
                    <MenuItem value="Luxury ($2000+)">Luxury ($2000+)</MenuItem>
                </Select>
                <FormHelperText>How much money will you spend?</FormHelperText>
            </FormControl>

            <FormControl>
                <InputLabel shrink id="tpf-tripType">Trip Type</InputLabel>
                <Select labelId="tpf-tripType" {...tripType} displayEmpty>
                    <MenuItem value="" disabled>Select a Trip Type</MenuItem>
                    <MenuItem value="none"><em>No preference</em></MenuItem>
                    <MenuItem value="Explore Cities">Explore Cities</MenuItem>
                    <MenuItem value="Airport Layovers">Airport Layovers</MenuItem>
                    <MenuItem value="Road Trip">Road Trip</MenuItem>
                    <MenuItem value="Backpaking">Backpaking</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
                <FormHelperText>How do you want to spend your time?</FormHelperText>
            </FormControl>

            <FormControl>
                <InputLabel shrink id="tpf-splitCosts">Split Costs</InputLabel>
                <Select labelId="tpf-splitCosts" {...splitCosts} displayEmpty>
                    <MenuItem value="" disabled>Split Costs?</MenuItem>
                    <MenuItem value="none"><em>No preference</em></MenuItem>
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                </Select>
                <FormHelperText>Do you want to split costs with others?</FormHelperText>
            </FormControl>

            <FormControl>
                <InputLabel shrink id="tpf-groupType">Group Type</InputLabel>
                <Select labelId="tpf-groupType" {...groupType} displayEmpty>
                    <MenuItem value="" disabled>Select a Group Type</MenuItem>
                    <MenuItem value="none"><em>No preference</em></MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    {getGroupTypeOptions()}
                    <MenuItem value="Any">Any</MenuItem>
                </Select>
                <FormHelperText>Who do you want to travel with?</FormHelperText>
            </FormControl>

            <FormControl>
                <InputLabel shrink id="tpf-Itinerary">Itinerary</InputLabel>
                <Select labelId="tpf-Itinerary" {...itinerary} displayEmpty>
                    <MenuItem value="" disabled>Itinerary</MenuItem>
                    <MenuItem value="none"><em>No preference</em></MenuItem>
                    <MenuItem value="Set">Set</MenuItem>
                    <MenuItem value="Flexible">Flexible</MenuItem>
                    <MenuItem value="None">None</MenuItem>
                </Select>
                <FormHelperText>How strict of an itinerary do you want?</FormHelperText>
            </FormControl>

            <FormControl>
                <InputLabel shrink id="tpf-accommodation">Accommodation</InputLabel>
                <Select {...accommodation} labelId="tpf-accommodation" displayEmpty>
                    <MenuItem value="" disabled>Select an Accommodation</MenuItem>
                    <MenuItem value="none"><em>No Preference</em></MenuItem>
                    <MenuItem value="Camping">Camping</MenuItem>
                    <MenuItem value="Couchsurf">CouchSurf</MenuItem>
                    <MenuItem value="Home">Home</MenuItem>
                    <MenuItem value="Hotel">Hotel</MenuItem>
                    <MenuItem value="Hostel">Hostel</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
                <FormHelperText>Where would you like to stay?</FormHelperText>
            </FormControl>
        </section>
    )
}

export default TripsPageAdvanced;