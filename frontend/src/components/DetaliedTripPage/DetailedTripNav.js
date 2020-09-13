import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/detailedTripPage/detailedTripNav.css';
import { getTripRequests, getTripTravelers } from '../../util/apiCalls/getRequests';

const DetailedTripNav = ({ trip = {} }) => {
    const [ requests, setRequests ] = useState([]);
    const [ travelers, setTravelers ] = useState([]);

    const getRequestsCall = async () => {
        const data = await getTripRequests(trip.id)
        if(data.requests) {
            setRequests(data.requests);
        } else {
            setRequests([]);
        }
    }

    const getTravelersCall = async () => {
        const data = await getTripTravelers(trip.id);
        if(data.travelers) {
            setTravelers(data.travelers);
        } else {
            setTravelers([]);
        }
    }

    useEffect(() => {
        getTravelersCall();
        getRequestsCall();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <nav className="dt-nav">
            <NavLink exact to={`/trips/${trip.id}`}>TRAVELERS ({travelers.length})</NavLink>
            <NavLink exact to={`/trips/${trip.id}/requests`}>REQUESTS ({requests.length})</NavLink>
        </nav>
    )
}

export default DetailedTripNav;