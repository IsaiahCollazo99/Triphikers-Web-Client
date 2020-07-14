import React, { useEffect, useState } from 'react';
import { getAllTrips } from '../../util/apiCalls/getRequests';
import { deleteTrip } from '../../util/apiCalls/deleteRequests';
import TripCard from '../General/TripCard';
import '../../css/tripsPage/tripsPage.css';
import { completeTrip } from '../../util/apiCalls/patchRequests';
import TripsPageFilter from './TripsPageFilter';
import { useHistory } from 'react-router-dom';

const TripsPage = () => {
    const [ trips, setTrips ] = useState([]);
    const [ response, setResponse ] = useState(null);

    const history = useHistory();

    const redirect = () => {
        history.push("/trips/create");
    }

    const completeTripCall = async ( id ) => {
        try {
            const completeTripResponse = await completeTrip(id);
            setResponse(completeTripResponse);
            getTripsCall();
        } catch ( error ) {
            setResponse(<p className="error">There was a problem with the complete request.</p>)
            console.log(error);
        }
    }

    const deleteTripCall = async ( id ) => {
        try {
            const deleteResponse = await deleteTrip(id);
            setResponse(deleteResponse);
            getTripsCall();
        } catch ( error ) {
            setResponse(<p className="error">There was a problem with the delete request.</p>)
            console.log(error);
        }
    }
    
    const getTripsCall = async () => {
        try {
            const { trips: allTrips } = await getAllTrips();
            if(!allTrips.length) {
                console.log("nothing")
                setResponse(<p className="error">No Trips Found</p>)
            } else {
                setTrips(allTrips);
            }
        } catch (error) {
            setTrips([]);
            if(error.response) {
                const { response: { data: { error: errorText }}} = error;
                setResponse(<p className="error">{errorText}</p>)
            }
            console.log(error);
        }
    }
    
    useEffect(() => {
        getTripsCall();
    }, [])

    let tripsList;
    if(trips.length) {
        tripsList = trips.map(trip => {
            console.log(trip);
            return (
                <TripCard trip={trip} deleteTripCall={deleteTripCall} completeTripCall={completeTripCall} key={trip.id} />
            )
        })
    }
    
    return (
        <div className="tripsPage">
            <button onClick={redirect} className="tp-createTrip">CREATE A TRIP</button>
            <TripsPageFilter />
            <div className="tripsPageFeed">
                {response}
                {tripsList}
            </div>
        </div>
    )
}

export default TripsPage;