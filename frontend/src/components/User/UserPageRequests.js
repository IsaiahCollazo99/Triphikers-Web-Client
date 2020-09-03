import React from 'react';
import FriendRequestCard from './FriendRequestCard';

const UserPageRequests = ({ friendRequests = [], refresh }) => {

    const requestsList = friendRequests.map((request, i) => {
        return (
            <FriendRequestCard user={request} refresh={refresh} key={i} />
        )
    })
    
    return (
        <section className="up-requests">
            {requestsList}
        </section>
    )
}

export default UserPageRequests;