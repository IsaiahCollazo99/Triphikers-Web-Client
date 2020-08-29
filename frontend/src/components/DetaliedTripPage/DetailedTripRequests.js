import React, { useState, useEffect } from 'react';
import { getTripRequests } from '../../util/apiCalls/getRequests';
import '../../css/detailedTripPage/detailedTripRequest.css';
import RequestCard from '../General/RequestCard';

const DetailedTripRequests = ({ trip = {} }) => {
    const [ requests, setRequests ] = useState([]);
    const [ response, setResponse ] = useState(null);

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

    let requestList = requests.map(user => {
        return (
            <RequestCard user={user} tripId={trip.id} key={user.id} setResponse={setResponse} refresh={getRequests}/>
        )
    })

    if(!requestList.length) {
        requestList = <p className="error">There are no requests at this time.</p>
    }

    return (
        <section className="dt-requests">
            {response}
            {requestList}
        </section>
    )
}

export default DetailedTripRequests;