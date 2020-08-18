import React, { useContext } from 'react';
import '../../css/userPage/userPageAbout.css'
import { AuthContext } from '../../providers/AuthContext';

const UserPageAbout = ({ user }) => {
    const { currentUser } = useContext(AuthContext);

    const displayEdit = () => {
        if(currentUser.id === user.id) {
            return <button>Edit</button>
        } else {
            return null;
        }
    }

    return (
        <section className="up-about">
            {displayEdit()}
            <p><span>Language: </span>{user.language}</p>
        </section>

    )
}

export default UserPageAbout;

