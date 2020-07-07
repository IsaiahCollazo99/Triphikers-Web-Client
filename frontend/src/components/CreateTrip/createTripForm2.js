import React from 'react';
import '../../css/createTrip/createTripForms.css';

const CreateTripForm2 = ( props ) => {
    const {
        title,
        accommodation,
        budget,
        split,
        itinerary,
        description,
        handlePageChange,
        handleSubmit
    } = props;
    
    return (
        <>
        <header>
            <h1>Create a Trip</h1>
            <h3>2/2</h3>
        </header>
        <form onSubmit={handleSubmit} className="createTrip2">
            <label htmlFor="title">
                <p>Trip Title: </p>
                <input type="text" {...title} placeholder="Enter a Trip Title" name="title" required />
            </label>

            <label htmlFor="accommodation">
                <p>Accommodation: </p>
                <select {...accommodation} name="accommodation" required>
                    <option value="" disabled>Select an Accommodation</option>
                    <option value="Camping">Camping</option>
                    <option value="Couchsurf">CouchSurf</option>
                    <option value="Home">Home</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Hostel">Hostel</option>
                    <option value="Other">Other</option>
                </select>
            </label>

            <label htmlFor="budget">
                <p>Your Budget: </p>
                <input type="number" name="budget" {...budget} required/>
            </label>

            <div className="tripForm2Bottom">
                <label htmlFor="split">
                    <p>Split Costs: </p>
                    <select {...split} name="split" required>
                        <option value="" disabled>Split Costs?</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </label>

                <label htmlFor="itinerary">
                    <p>Itinerary Type: </p>
                    <select {...itinerary} name="itinerary" required>
                        <option value="" disabled>Select An Itinerary Type</option>
                        <option value="Set">Set</option>
                        <option value="Flexible">Flexible</option>
                        <option value="None">None</option>
                    </select>
                </label>
            </div>

            <label htmlFor="description" className="createTripDesc">
                <p>Describe Your Trip: </p>
                <textarea {...description} name="description" col="15" rows="5"/>
            </label>

            <div className="buttons">
                <button onClick={handlePageChange}>Back</button>
                <input type="submit" />
            </div>
        </form>
        </>
    )
}

export default CreateTripForm2;