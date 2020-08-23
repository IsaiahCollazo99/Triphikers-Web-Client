import React, { useState, useContext, useEffect } from 'react';
import '../../css/createTrip/createTripForms.css';
import CreateTripDestination from './CreateTripDestination';
import LanguageSelect from '../General/LanguageSelect';
import { AuthContext } from '../../providers/AuthContext';
import { getUserById } from '../../util/apiCalls/getRequests';

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
        meetup, 
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
            setError(<p className="error">Please enter a valid date to entry</p> )
            return false;
        } else if(dateToDate.getTime() <= dateFromDate.getTime()) {
            setError(<p className="error">Please enter a valid date to entry</p> )
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
            return <option value="Only Women">Non-Binary Only</option>
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
                <label htmlFor="dateFrom">
                    <p>Date From: </p> 
                    <input type="date" {...dateFrom} name="dateFrom" required />
                </label>

                <label htmlFor="dateTo">
                    <p>Date To: </p>
                    <input type="date" {...dateTo} name="dateTo" required />
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

            <label htmlFor="meetup">
                <p>Before Trip Meetup: </p>
                <select {...meetup} name="meetup" required>
                    <option value="" disabled>Select a Before Trip Meetup</option>
                    <option value="In Person">In Person</option>
                    <option value="Video Call">Video Call</option>
                </select>
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