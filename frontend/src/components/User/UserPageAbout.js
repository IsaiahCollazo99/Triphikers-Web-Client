import React from 'react';
import '../../css/userPage/userPageAbout.css'

const UserPageAbout = ({ user }) => {

    return (
        <section className="up-about">
            <section className="up-aboutList">
                <p><span>Language: </span>{user.language}</p>
            </section>
        </section>

    )
}

export default UserPageAbout;

