import React, { useState, useEffect } from 'react';
import { getTripRequests } from '../../util/apiCalls/getRequests';
import '../../css/detailedTripPage/detailedTripRequest.css';

const DetailedTripRequests = ({ trip = {} }) => {
    const [ requests, setRequests ] = useState([]);
    
    const requestList = requests.map(user => {
        return (
            <article className="requestCard" key={user.id}>
                <section className="rc-info">
                    <img src={user.profile_picture} alt={user.full_name} />
                    <p>{user.full_name}</p>
                </section>

                <section className="rc-buttons">
                    <button className="rc-accept">Accept</button>
                    <button className="rc-deny">Deny</button>
                </section>
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
        <section className="dt-requests">
            {requestList}
        </section>
    )
}

export default DetailedTripRequests;