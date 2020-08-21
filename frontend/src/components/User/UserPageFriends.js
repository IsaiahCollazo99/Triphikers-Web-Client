import React from 'react';
import '../../css/userPage/userPageFriends.css';
import { Link } from 'react-router-dom';

const UserPageFriends = ({ userFriends = [] }) => {

    const friendsList = userFriends.map(friend => {
        return (
            <article className="friendCard" key={friend.id}>
                <section className="fc-info">
                    <img src={friend.profile_picture} alt={friend.full_name} />
                    <Link to={`/user/${friend.id}`}>{friend.full_name}</Link>
                </section>
            </article>
        )
    });
    
    return (
        <section className="up-friends">
            {friendsList}
        </section>
    )
}

export default UserPageFriends;