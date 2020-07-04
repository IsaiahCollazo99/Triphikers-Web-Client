import React from 'react';

const CreateTripForm1 = ( props ) => {
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

    return (
        <form onSubmit={handlePageChange}>
            <header>
                <h1>Create a Trip</h1>
                <h3>1/2</h3>
            </header>
        
            <label htmlFor="destination">Select a Destination:</label>
            <select {...destination} name="destination" required>
                <option value="" disabled>Select a Destination</option>
                <option value="NY">New York</option>
            </select>

            <label htmlFor="dateFrom">Date From: </label>
            <input type="date" {...dateFrom} name="dateFrom" required />
            <label htmlFor="dateTo">Date To: </label>
            <input type="date" {...dateTo} name="dateTo" required />

            <label htmlFor="groupType">Group Type: </label>
            <select {...groupType} name="groupType" required>
                <option value="" disabled>Select a Group Type</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Only Women">Women Only</option>
                <option value="Only Men">Men Only</option>
                <option value="Any">Any</option>
            </select>

            <label htmlFor="language">Language: </label>
            <select {...language} name="language" required>
                <option value="" disabled>Select a Language</option>
                <option value="English">English</option>
            </select>

            <label htmlFor="meetup">Before Trip Meetup: </label>
            <select {...meetup} name="meetup" required>
                <option value="" disabled>Select a Before Trip Meetup</option>
                <option value="In Person">In Person</option>
                <option value="Video Call">Video Call</option>
            </select>

            <label htmlFor="tripType">Trip Type: </label>
            <select {...tripType} name="tripType" required>
                <option value="" disabled>Select a Trip Type</option>
                <option value="Explore Cities">Explore Cities</option>
                <option value="Airport Layovers">Airport Layovers</option>
                <option value="Road Trip">Road Trip</option>
                <option value="Backpacking">Backpacking</option>
                <option value="Other">Other</option>
            </select>

            <input type="submit" value="Next Page" />
        </form>
    )
}

export default CreateTripForm1;