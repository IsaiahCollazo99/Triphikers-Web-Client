import React, { useState } from 'react';
import { useInput } from '../../util/customHooks';

const CreateTripsContainer = () => {
    const [ page, setPage ] = useState(1);
    const destination = useInput("disabled");
    const dateFrom = useInput("");
    const dateTo = useInput("");
    const groupType = useInput("disabled");
    const language = useInput("disabled");
    const meetup = useInput("disabled");
    const tripType = useInput("disabled");
    const title = useInput("");
    const firstTime = useInput("disabled");
    const accommodation = useInput("disabled");
    const budget = useInput("disabled");
    const split = useInput("disabled");
    const itinerary = useInput("disabled");

    const handlePageChange = () => {
        page === 1 ? setPage(2) : setPage(1);
    }
    
    return (
        <div className="createTripsContainer">
            create
        </div>
    )
}

export default CreateTripsContainer;