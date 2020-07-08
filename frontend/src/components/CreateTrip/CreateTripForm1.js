import React from 'react';
import '../../css/createTrip/createTripForms.css';

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
        <>
        <header>
            <h1>Create a Trip</h1>
            <h3>1/2</h3>
        </header>
        <form onSubmit={handlePageChange} className="createTrip1">
            <label htmlFor="destination">
                <p>Select a Destination: </p>
                <select {...destination} name="destination" required>
                    <option value="" disabled>Select a Destination</option>
                    <option value="NY">New York</option>
                </select>
            </label>

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
                    <option value="Only Women">Women Only</option>
                    <option value="Only Men">Men Only</option>
                    <option value="Any">Any</option>
                </select>
            </label>

            <label htmlFor="language">
                <p>Language: </p>
                <select {...language} name="language" required>
                    <option value="" disabled>Select a Language</option>
                    <option value="English">English</option>
                </select>
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