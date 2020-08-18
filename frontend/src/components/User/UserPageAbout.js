import React, { useContext } from 'react';
import '../../css/userPage/userPageAbout.css'
import { AuthContext } from '../../providers/AuthContext';
import { useHistory } from 'react-router-dom';

const UserPageAbout = ({ user }) => {
    const { currentUser } = useContext(AuthContext);
    const history = useHistory();

    const redirect = () => {
        history.push("/user/edit");
    }

    const displayEdit = () => {
        if(currentUser.id === user.id) {
            return <button onClick={redirect}>Edit</button>
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

