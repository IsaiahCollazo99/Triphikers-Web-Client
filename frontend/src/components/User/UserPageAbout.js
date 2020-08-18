import React from 'react';
import '../../css/userPage/About.css'

const UserPageAbout = ({ user }) => {

    return (
        <section className="up-about">
            <button>Edit</button>
            <p><span>Language: </span>{user.language}</p>
        </section>

    )
}

export default UserPageAbout;

