import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthContext';
import { deleteFriendRequest } from '../../util/apiCalls/deleteRequests';
import { acceptFriendRequest } from '../../util/apiCalls/postRequests';

const FriendRequestCard = ({ user, refresh }) => {
    const { currentUser } = useContext(AuthContext);

    const approveRequest = async () => {
        try {
            const data = await acceptFriendRequest(user.requester_id, currentUser.id);
            refresh();
            console.log(data);
        } catch ( error ) {
            console.log(error);
        }
    }

    const denyRequest = async () => {
        try { 
            await deleteFriendRequest(user.requester_id, currentUser.id);
            refresh();
        } catch ( error ) {
            console.log(error);
        }
    }

    return (
        <article className="friendRequestCard" key={user.requester_id}>
            <section className="frc-info">
                <img src={user.profile_picture} alt={user.full_name} />
                <p>{user.full_name}</p>
            </section>

            <section className="frc-buttons">
                <button className="frc-accept" onClick={approveRequest}>Accept</button>
                <button className="frc-deny" onClick={denyRequest}>Deny</button>
            </section>
        </article>
    )
}

export default FriendRequestCard;