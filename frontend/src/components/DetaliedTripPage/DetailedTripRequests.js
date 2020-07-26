import React, { useState, useEffect } from 'react';
import { getTripRequests } from '../../util/apiCalls/getRequests';

const DetailedTripRequests = ({ trip = {} }) => {
    const [ requests, setRequests ] = useState([]);
    
    const requestList = requests.map(user => {
        return (
            <article className="userCard">
                {user.full_name}
            </article>
        )
    })

    const getRequests = async () => {
        const data = await getTripRequests(trip.id);
        if(data.requests) {
            setRequests(data.requests);
        } else {
            setRequests([]);
        }
    }

    useEffect(() => {
        getRequests();
    }, [])

    return (
        <section className="detailedTripRequests">
            {requestList}
        </section>
    )
}

export default DetailedTripRequests;