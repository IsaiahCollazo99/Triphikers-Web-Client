import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import { approveTraveler } from '../../util/apiCalls/postRequests';
import { deleteTripRequest } from '../../util/apiCalls/deleteRequests';

const RequestCard = ({ user, tripId, setResponse, refresh }) => {
    const approveRequest = async () => {
        try {
            const response = await approveTraveler(tripId, user.requester_id);
            await deleteTripRequest(tripId, user.requester_id);
            setResponse(response);
            refresh();

        } catch ( error ) {
            console.log(error);
        }
    }

    const denyRequest = async () => {
        try {
            const response = await deleteTripRequest(tripId, user.requester_id);
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
                <Link to={`/user/${user.requester_id}`}>{user.full_name}</Link>
            </section>

            <section className="rc-buttons">
                <Button 
                    color="primary"
                    variant="contained"
                    onClick={approveRequest}
                >Accept</Button>
                <Button 
                    onClick={denyRequest}
                    color="primary"
                    variant="outlined"
                >Deny</Button>
            </section>
        </article>
    )
}

export default RequestCard;