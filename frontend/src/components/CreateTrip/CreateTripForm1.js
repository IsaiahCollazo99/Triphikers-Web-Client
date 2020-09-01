import React, { useState, useContext, useEffect } from 'react';
import '../../css/createTrip/createTripForms.css';
import CreateTripDestination from './CreateTripDestination';
import LanguageSelect from '../General/LanguageSelect';
import { AuthContext } from '../../providers/AuthContext';
import { getUserById } from '../../util/apiCalls/getRequests';
import { 
    InputLabel, 
    Select, 
    MenuItem, 
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
                    variant="standard"
                    InputLabelProps={{
                        shrink: true,
                        required: false
                    }}
                    required
                    helperText="When will your trip begin?"
                    {...dateFrom}
                />

                <FormControl required>
                    <TextField 
                        label="Date To"
                        type="date"
                        variant="standard"
                        InputLabelProps={{
                            shrink: true,
                            required: false
                        }}
                        required
                        helperText="When will your trip end?"
                        {...dateTo}
                    />
                </FormControl>
            </section>

            <section className="ct-budgets">
                <label htmlFor="budget" className="ct-budget">
                    <p>Your Budget: </p>
                    <select {...budget} name="budget" required>
                        <option value="" disabled>Select Your Budget</option>
                        <option value="Budget ($0 - $999)">Budget ($0 - $999)</option>
                        <option value="Average ($1000 - $1999)">Average ($1000 - $1999)</option>
                        <option value="Luxury ($2000+)">Luxury ($2000+)</option>
                    </select>
                </label>

                <label htmlFor="split">
                    <p>Split Costs: </p>
                    <select {...split} name="split" required>
                        <option value="" disabled>Split Costs?</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </label>
            </section>

            <label htmlFor="groupType">
                <p>Group Type: </p>
                <select {...groupType} name="groupType" required>
                    <option value="" disabled>Select a Group Type</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    {getGroupTypeOptions()}
                    <option value="Any">Any</option>
                </select>
            </label>

            <label htmlFor="language">
                <p>Language: </p>
                <LanguageSelect input={language} />
            </label>


            <label htmlFor="tripType">
                <p>Trip Type: </p>
                <select {...tripType} name="tripType" required>
                    <option value="" disabled>Select a Trip Type</option>
                    <option value="Explore Cities">Explore Cities</option>
                    <option value="Airport Layovers">Airport Layovers</option>
                    <option value="Road Trip">Road Trip</option>
                    <option value="Backpacking">Backpacking</option>
                    <option value="Other">Other</option>
                </select>
            </label>

            <input type="submit" value="Next Page" />
        </form>
        </>
    )
}

export default CreateTripForm1;