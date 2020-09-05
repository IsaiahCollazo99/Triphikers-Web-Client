import React from 'react';
import FriendCard from './FriendCard';
import '../../css/userPage/userPageFriends.css';

const UserPageFriends = ({ userFriends = [], refresh }) => {

    const friendsList = userFriends.map(friend => {
        return (
            <FriendCard friend={friend} refresh={refresh} key={friend.id}/>
        )
    });

    const displayFriends = friendsList.length ? friendsList : (
        <p className="error">Become their first friend!</p>
    )
    
    return (
        <section className="up-friends">
            {displayFriends}
        </section>
    )
}

export default UserPageFriends;