import React from 'react';
import { approveTraveler } from '../../util/apiCalls/postRequests';
import { deleteTripRequest } from '../../util/apiCalls/deleteRequests';

const RequestCard = ({ user, tripId, setResponse, refresh }) => {
    const approveRequest = async () => {
        try {
            console.log(user);
            const response = await approveTraveler(tripId, user.requester_id);
            await deleteTripRequest(tripId, user.requester_id);
            setResponse(response);
            refresh();

        } catch ( error ) {
            console.log(error);
        }
    }
    
    return (
        <article className="requestCard" key={user.id}>
            <section className="rc-info">
                <img src={user.profile_picture} alt={user.full_name} />
                <p>{user.full_name}</p>
            </section>

            <section className="rc-buttons">
                <button className="rc-accept" onClick={approveRequest}>Accept</button>
                <button className="rc-deny">Deny</button>
            </section>
        </article>
    )
}

export default RequestCard;