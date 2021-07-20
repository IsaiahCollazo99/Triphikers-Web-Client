import React from 'react';
import FriendRequestCard from './friend-request-card';

const UserPageRequests = ({ friendRequests = [], refresh }) => {

    const requestsList = friendRequests.map((request, i) => {
        return (
            <FriendRequestCard user={request} refresh={refresh} key={i} />
        )
    })

    const displayRequests = requestsList.length ? requestsList : (
        <p className="error">You have no requests at the moment</p>
    )
    
    return (
        <section className="up-requests">
            {displayRequests}
        </section>
    )
}

export default UserPageRequests;