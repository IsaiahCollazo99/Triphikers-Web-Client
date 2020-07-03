import React, { useEffect, useState } from 'react';
import { getAllTrips } from '../../util/apiCalls/getRequests';

const TripsPage = () => {
    const [ trips, setTrips ] = useState([]);
    
    const getTripsCall = async () => {
        try {
            const allTrips = await getAllTrips();
            setTrips(allTrips);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getTripsCall();
    }, [])
    
    return (
        <div className="tripPage">
            Trips
        </div>
    )
}

export default TripsPage;