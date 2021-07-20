import Button from '@material-ui/core/Button';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../../providers/auth-context';
import { removeFriend } from '../../../util/api-calls/delete-requests';

const FriendCard = ({ friend, refresh }) => {
    const { currentUser } = useContext(AuthContext);

    const deleteFriendCall = async () => {
        try { 
            await removeFriend(currentUser.id, friend.user_2);
            refresh();
        } catch ( error ) {
            console.log(error);
        }
    }

    const displayRemove = () => {
        if(currentUser.id === friend.user_1) {
            return (
                <Button 
                    className="frc-deny" 
                    onClick={deleteFriendCall}
                    variant="contained"
                    color="primary"
                >Remove</Button>   
            )
        } else {
            return null
        }
    }
    
    return (
        <article className="friendCard" key={friend.id}>
            <section className="fc-info">
                <img src={friend.profile_picture} alt={friend.full_name} />
                <Link to={`/user/${friend.id}`}>{friend.full_name}</Link>
            </section>

            <section className="fc-buttons">
                {displayRemove()}
            </section>
        </article>
    )
}

export default FriendCard;