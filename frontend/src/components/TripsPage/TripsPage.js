import React, { useEffect, useState } from 'react';
import { getAllTrips } from '../../util/apiCalls/getRequests';
import TripCard from '../General/TripCard';

const TripsPage = () => {
    const [ trips, setTrips ] = useState([]);
    
    const getTripsCall = async () => {
        try {
            const { trips: allTrips } = await getAllTrips();
            setTrips(allTrips);
        } catch (error) {
            setTrips([]);
            console.log(error);
        }
    }
    
    useEffect(() => {
        getTripsCall();
    }, [])

    const tripsList = trips.map(trip => {
        console.log(trip);
        return (
            <TripCard trip={trip} key={trip.id} />
        )
    })
    
    return (
        <div className="tripPage">
            {tripsList}
        </div>
    )
}

export default TripsPage;