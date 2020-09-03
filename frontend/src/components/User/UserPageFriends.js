import React from 'react';
import FriendCard from './FriendCard';
import '../../css/userPage/userPageFriends.css';

const UserPageFriends = ({ userFriends = [], refresh }) => {

    const friendsList = userFriends.map(friend => {
        return (
            <FriendCard friend={friend} refresh={refresh} key={friend.id}/>
        )
    });
    
    return (
        <section className="up-friends">
            {friendsList}
        </section>
    )
}

export default UserPageFriends;