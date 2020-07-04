import React from 'react';
import '../../css/createTrip/createTripForms.css';

const CreateTripForm2 = ( props ) => {
    const {
        title,
        firstTime,
        accommodation,
        budget,
        split,
        itinerary,
        description,
        handlePageChange,
        handleSubmit
    } = props;
    
    return (
        <form onSubmit={handleSubmit}>
            <header>
                <h1>Create a Trip</h1>
                <h3>2/2</h3>
            </header>
        
            <label htmlFor="title">Trip Title: </label>
            <input type="text" {...title} placeholder="Enter a Trip Title" name="title" required />

            <label htmlFor="firstTime">First Time: </label>
            <select {...firstTime} name="firstTime" requried>
                <option value="" disabled>Is this your first time?</option>
                <option value="Yes" disabled>Yes</option>
                <option value="No" disabled>No</option>
            </select>

            <label htmlFor="accommodation">Accommodation: </label>
            <select {...accommodation} name="accommodation" required>
                <option value="" disabled>Select an Accommodation</option>
                <option value="Camping">Camping</option>
                <option value="Couchsurf">CouchSurf</option>
                <option value="Home">Home</option>
                <option value="Hotel">Hotel</option>
                <option value="Hostel">Hostel</option>
                <option value="Other">Other</option>
            </select>

            <label htmlFor="budget">Your Budget: </label>
            <input type="number" name="budget" {...budget} required/>
            
            <label htmlFor="split">Split Costs: </label>
            <select {...split} name="split" required>
                <option value="" disabled>Split Costs?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>

            <label htmlFor="itinerary">Itinerary Type: </label>
            <select {...itinerary} name="itinerary" required>
                <option value="" disabled>Select An Itinerary Type</option>
                <option value="Set">Set</option>
                <option value="Flexible">Flexible</option>
                <option value="None">None</option>
            </select>

            <label htmlFor="description">Describe Your Trip: </label>
            <textarea {...description} name="description" col="15" rows="10"/>

            <div className="buttons">
                <button onClick={handlePageChange}>Back</button>
                <input type="submit" />
            </div>
        </form>
    )
}

export default CreateTripForm2;