import React, { useState, useContext, useEffect } from 'react';
import '../../css/createTrip/createTripForms.css';
import CreateTripDestination from './CreateTripDestination';
import LanguageSelect from '../General/LanguageSelect';
import { AuthContext } from '../../providers/AuthContext';
import { getUserById } from '../../util/apiCalls/getRequests';
import { 
    InputLabel, 
    Select, 
    FormHelperText, 
    FormControl, 
    TextField, 
    Button 
} from '@material-ui/core';

const CreateTripForm1 = ( props ) => {
    const [ error, setError ] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const [ userGender, setUserGender ] = useState(null);

    const {
        destination, 
        dateFrom, 
        dateTo, 
        groupType, 
        language, 
        budget,
        split,
        tripType,
        handlePageChange
    } = props;

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
    })

    const isValidDate = () => {
        const today = new Date();
        const dateFromDate = new Date(dateFrom.value);
        const dateToDate = new Date(dateTo.value);

        if(today.getTime() >= dateToDate.getTime()) {
            setError(<p className="error">Please enter a valid date</p> )
            return false;
        } else if(dateToDate.getTime() <= dateFromDate.getTime()) {
            setError(<p className="error">Please enter a valid date</p> )
            return false;
        }

        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isValidDate()) {
            handlePageChange();
        }
    }

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
        <>
        <header>
            <h1>Create a Trip</h1>
            <h3>1/2</h3>
        </header>
        {error}
        <form onSubmit={handleSubmit} className="createTrip1">

            <CreateTripDestination destination={destination} />

            <section className="createTripDates">
                <TextField                     
                    label="Date From"
                    type="date"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                        required: false
                    }}
                    required
                    helperText="When will your trip begin?"
                    fullWidth
                    {...dateFrom}
                />

                <TextField 
                    label="Date To"
                    type="date"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                        required: false
                    }}
                    required
                    helperText="When will your trip end?"
                    fullWidth
                    {...dateTo}
                />
            </section>

            <section className="ct-budgets">
                <FormControl variant="outlined">
                    <InputLabel shrink required={false} htmlFor="budget">Budget</InputLabel>
                    <Select
                        native
                        {...budget} 
                        displayEmpty 
                        fullWidth 
                        variant="outlined"
                        inputProps={{
                            name: "budget"
                        }}
                        required
                        notched
                        label="Budget"
                    >
                        <option value="" disabled>Select Your Budget</option>
                        <option value="Budget ($0 - $999)">Budget ($0 - $999)</option>
                        <option value="Average ($1000 - $1999)">Average ($1000 - $1999)</option>
                        <option value="Luxury ($2000+)">Luxury ($2000+)</option>
                    </Select>
                    <FormHelperText>What is your budget for the trip?</FormHelperText>
                </FormControl>

                <FormControl variant="outlined">
                    <InputLabel shrink required={false} htmlFor="split">Split Costs</InputLabel>
                    <Select
                        native
                        {...split} 
                        displayEmpty 
                        fullWidth 
                        variant="outlined"
                        inputProps={{
                            name: "split"
                        }}
                        required
                        notched
                        label="Split Costs"
                    >
                        <option value="" disabled>Split Costs?</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </Select>
                    <FormHelperText>Split costs with other travelers?</FormHelperText>
                </FormControl>
            </section>

            <FormControl variant="outlined">
                <InputLabel shrink required={false} htmlFor="groupType">Group Type</InputLabel>
                <Select
                    native
                    {...groupType} 
                    displayEmpty 
                    fullWidth 
                    variant="outlined"
                    inputProps={{
                        name: "groupType"
                    }}
                    required
                    notched
                    label="Group Type"
                >
                    <option value="" disabled>Select a Group Type</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    {getGroupTypeOptions()}
                    <option value="Any">Any</option>
                </Select>
                <FormHelperText>Who would you like to travel with?</FormHelperText>
            </FormControl>

            <FormControl variant="outlined">
                <InputLabel shrink required={false} htmlFor="language">Language</InputLabel>
                <Select
                    native
                    {...language} 
                    displayEmpty 
                    fullWidth 
                    variant="outlined"
                    inputProps={{
                        name: "language"
                    }}
                    required
                    notched
                    label="Language"
                >
                    <option value="" disabled>Select a language</option>
                    <LanguageSelect input={language} />
                </Select>
                <FormHelperText>What language will you speak?</FormHelperText>
            </FormControl>

            <FormControl variant="outlined">
                <InputLabel shrink required={false} htmlFor="tripType">Trip Type</InputLabel>
                <Select
                    native
                    {...tripType} 
                    displayEmpty 
                    fullWidth 
                    variant="outlined"
                    inputProps={{
                        name: "tripType"
                    }}
                    required
                    notched
                    label="Trip Type"
                >
                    <option value="" disabled>Select a Trip Type</option>
                    <option value="Explore Cities">Explore Cities</option>
                    <option value="Airport Layovers">Airport Layovers</option>
                    <option value="Road Trip">Road Trip</option>
                    <option value="Backpacking">Backpacking</option>
                    <option value="Other">Other</option>
                </Select>
                <FormHelperText>Who would you like to travel with?</FormHelperText>
            </FormControl>

            <Button type="submit" variant="contained" color="primary">Next Page</Button>
        </form>
        </>
    )
}

export default CreateTripForm1;