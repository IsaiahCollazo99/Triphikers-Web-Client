import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthContext';
import { Link } from 'react-router-dom';
import '../../css/userPage/userPageFriends.css';

const FriendCard = ({ friend, refresh }) => {
    const { currentUser } = useContext(AuthContext);

    const deleteFriendCall = () => {

    }
    
    return (
        <article className="friendCard" key={friend.id}>
            <section className="fc-info">
                <img src={friend.profile_picture} alt={friend.full_name} />
                <Link to={`/user/${friend.id}`}>{friend.full_name}</Link>
            </section>

            <section className="frc-buttons">
                <button className="frc-deny" onClick={deleteFriendCall}>Deny</button>
            </section>
        </article>
    )
}

export default FriendCard;