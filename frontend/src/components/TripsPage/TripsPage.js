import React, { useEffect, useState } from 'react';
import { getAllTrips } from '../../util/apiCalls/getRequests';
import { deleteTrip } from '../../util/apiCalls/deleteRequests';
import TripCard from '../General/TripCard';
import '../../css/tripsPage/tripsPage.css';

const TripsPage = () => {
    const [ trips, setTrips ] = useState([]);
    const [ response, setResponse ] = useState(null);

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
                <TripCard trip={trip} deleteTripCall={deleteTripCall} key={trip.id} />
            )
        })
    }
    
    return (
        <div className="tripsPage">
            {response}
            {tripsList}
        </div>
    )
}

export default TripsPage;