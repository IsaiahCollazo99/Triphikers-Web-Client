import React from 'react';
import '../../css/userPage/userPageAbout.css'

const UserPageAbout = ({ user }) => {

    return (
        <section className="up-about">
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

