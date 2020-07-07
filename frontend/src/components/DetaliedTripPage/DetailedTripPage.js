import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTripById } from '../../util/apiCalls/getRequests';

const DetailedTripPage = () => {
    const { id } = useParams();
    const [ trip, setTrip ] = useState({});

    const getTripCall = async () => {
        try {
            const tripById = await getTripById(id);
            setTrip(tripById.trip);
        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(() => {
        getTripCall();
    }, [])

    return (
        <div className="detailedTripContainer">
            <header></header>
            <nav></nav>
            
        </div>
    )
}

export default DetailedTripPage;