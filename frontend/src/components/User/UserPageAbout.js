import React from 'react';
import { useHistory } from 'react-router-dom';
import '../../css/userPage/userPageAbout.css'

const UserPageAbout = ({ user }) => {
    const history = useHistory();

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

