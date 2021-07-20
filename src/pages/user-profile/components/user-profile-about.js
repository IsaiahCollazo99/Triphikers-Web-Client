import React from 'react';

import './user-profile-about.css'

const UserPageAbout = ({ user }) => {

    return (
        <section className="up-about">
            <label className="up-bio">
                <span>Bio: </span>
                <p>{user.bio}</p>
            </label>
            <section className="up-aboutList">
                <span>Language: </span><p>{user.language}</p>
                <span>Age: </span><p>{user.age}</p>
                <span>Country: </span><p>{user.country_of_origin}</p>
                <span>Gender: </span><p>{user.gender}</p>
            </section>
        </section>

    )
}

export default UserPageAbout;

