import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import CreateTripPage1 from './create-trip-page-1';
import CreateTripPage2 from './create-trip-page-2';
import { AuthContext } from '../../providers/auth-context';
import { createTrip, approveTraveler } from '../../util/apiCalls/post-requests';
import { useInput } from '../../util/custom-hooks';
import './create-trip-container.css';

const CreateTripsContainer = () => {
    const { currentUser } = useContext(AuthContext);
    const history = useHistory();
    
    const [ page, setPage ] = useState(1);
    const [ destination, setDestination ] = useState("");
    const [ error, setError ] = useState(null);
    const dateFrom = useInput("");
    const dateTo = useInput("");
    const groupType = useInput("");
    const language = useInput("");
    const tripType = useInput("");
    const title = useInput("");
    const accommodation = useInput("");
    const budget = useInput("");
    const split = useInput("");
    const itinerary = useInput("");
    const description = useInput("");

    const handlePageChange = () => {
        page === 1 ? setPage(2) : setPage(1);
    }

    const pageOne = {
        destination: { destination, setDestination },
        dateFrom,
        dateTo,
        groupType,
        language,
        budget,
        split,
        tripType
    }

    const pageTwo = {
        title,
        accommodation,
        itinerary,
        description,
        postError: error
    }

    const handleSubmit = async ( e ) => {
        try {
            e.preventDefault();
            const data = await createTrip({...pageOne, ...pageTwo}, currentUser);
            await approveTraveler(data.trip.id, currentUser.id);
            history.push("/trips");
        } catch ( error ) {
            setError(<p className="error">There was a problem with the request. Try again later.</p>);
        }
    }

    const formPageDisplay = page === 1 ? 
        <CreateTripPage1 {...pageOne} handlePageChange={handlePageChange} /> :
        <CreateTripPage2 {...pageTwo} handlePageChange={handlePageChange} handleSubmit={handleSubmit}/>
    
    return (
        <div className="createTripsContainer">
            {formPageDisplay}
        </div>
    )
}

export default CreateTripsContainer;