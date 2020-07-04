import React, { useState } from 'react';
import { useInput } from '../../util/customHooks';
import CreateTripForm1 from './CreateTripForm1';
import CreateTripForm2 from './CreateTripForm2';

const CreateTripsContainer = () => {
    const [ page, setPage ] = useState(1);
    const destination = useInput("");
    const dateFrom = useInput("");
    const dateTo = useInput("");
    const groupType = useInput("");
    const language = useInput("");
    const meetup = useInput("");
    const tripType = useInput("");
    const title = useInput("");
    const firstTime = useInput("");
    const accommodation = useInput("");
    const budget = useInput("");
    const split = useInput("");
    const itinerary = useInput("");
    const description = useInput("");

    const handlePageChange = () => {
        page === 1 ? setPage(2) : setPage(1);
    }

    const handleSubmit = () => {
        debugger;
    }


    const pageOne = {
        destination,
        dateFrom,
        dateTo,
        groupType,
        language,
        meetup,
        tripType,
        handlePageChange
    }

    const pageTwo = {
        title,
        firstTime,
        accommodation,
        budget,
        split,
        itinerary,
        description,
        handlePageChange,
        handleSubmit
    }

    const formPageDisplay = page === 1 ? 
        <CreateTripForm1 {...pageOne} /> :
        <CreateTripForm2 {...pageTwo} />
    
    return (
        <div className="createTripsContainer">
            {formPageDisplay}
        </div>
    )
}

export default CreateTripsContainer;