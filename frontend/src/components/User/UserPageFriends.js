import React from 'react';

const UserPageFriends = ({ userFriends = [] }) => {

    const friendsList = userFriends.map(friend => {
        return (
            <article className="friendCard" key={friend.id}>
                <section className="fc-info">
                    <img src={friend.profile_picture} alt={friend.full_name} />
                    <p>{friend.full_name}</p>
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