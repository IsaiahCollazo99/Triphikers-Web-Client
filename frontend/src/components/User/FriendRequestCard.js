import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthContext';
import { deleteFriendRequest } from '../../util/apiCalls/deleteRequests';
import { acceptFriendRequest } from '../../util/apiCalls/postRequests';
import { Link } from '@material-ui/core';
import Button from '@material-ui/core/Button';

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
                <Link to={`/user/${user.id}`}>{user.full_name}</Link>
            </section>

            <section className="frc-buttons">
                <Button 
                    className="frc-accept" 
                    onClick={approveRequest}
                    variant="contained"
                    color="primary"
                >Accept</Button>
                <Button 
                    className="frc-deny" 
                    onClick={denyRequest}
                    variant="outlined"
                    color="primary"
                >Deny</Button>
            </section>
        </article>
    )
}

export default FriendRequestCard;