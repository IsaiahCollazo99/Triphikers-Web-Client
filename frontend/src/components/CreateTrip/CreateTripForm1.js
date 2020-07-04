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
        
            <label for="destination">Select a Destination:</label>
            <select {...destination} name="destination" required>
                <option value="" disabled>Select a Destination</option>
                <option value="newYork">New York</option>
            </select>

            <label for="dateFrom">Date From: </label>
            <input type="date" {...dateFrom} name="dateFrom" required />
            <label for="dateTo">Date To: </label>
            <input type="date" {...dateTo} name="dateTo" required />

            <label for="groupType">Group Type: </label>
            <select {...groupType} name="groupType" required>
                <option value="" disabled>Select a Group Type</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="onlyWomen">Women Only</option>
                <option value="onlyMen">Men Only</option>
                <option value="any">Any</option>
            </select>

            <label for="language">Language: </label>
            <select {...language} name="language" required>
                <option value="" disabled>Select a Language</option>
                <option value="english">English</option>
            </select>

            <label for="meetup">Before Trip Meetup: </label>
            <select {...meetup} name="meetup" required>
                <option value="" disabled>Select a Before Trip Meetup</option>
                <option value="inPerson">In Person</option>
                <option value="videoCall">Video Call</option>
            </select>

            <label for="tripType">Trip Type: </label>
            <select {...tripType} name="tripType" required>
                <option value="" disabled>Select a Trip Type</option>
                <option value="explore">Explore Cities</option>
                <option value="layover">Airport Layovers</option>
                <option value="roadTrip">Road Trip</option>
                <option value="adventure">Backpacking</option>
                <option value="other">Other</option>
            </select>

            <input type="submit" value="Next Page" />
        </form>
    )
}

export default CreateTripForm1;