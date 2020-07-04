import React, { useState } from 'react';
import { useInput } from '../../util/customHooks';

const CreateTripsContainer = () => {
    const [ destination, setDestination ] = useInput("disabled");
    const [ dateFrom, setDateFrom ] = useInput("");
    const [ dateTo, setDateTo ] = useInput("");
    const [ groupType, setGroupType ] = useInput("disabled");
    const [ language, setLanguage ] = useInput("disabled");
    const [ meetup, setMeetup ] = useInput("disabled");
    const [ tripType, setTripType ] = useInput("disabled");
    const [ title, setTitle ] = useInput("");
    const [ firstTime, setFirstTime ] = useInput("disabled");
    const [ accommodation, setAccommodation ] = useInput("disabled");
    const [ budget, setBudget ] = useInput("disabled");
    const [ split, setSplit ] = useInput("disabled");
    const [ itinerary, setItinerary ] = useInput("disabled");
    const [ page, setPage ] = useState(1);
    
    return (
        <div className="createTripsContainer">
            create
        </div>
    )
}

export default CreateTripsContainer;