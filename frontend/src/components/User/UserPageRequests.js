import React from 'react';
import FriendRequestCard from './FriendRequestCard';

const UserPageRequests = ({ friendRequests = [], refresh }) => {

    const requestsList = friendRequests.map(request => {
        return (
            <FriendRequestCard user={request} refresh={refresh} />
        )
    })
    
    return (
        <section className="up-requests">
            {requestsList}
        </section>
    )
}

export default UserPageRequests;