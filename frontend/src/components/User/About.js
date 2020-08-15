import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../css/userPage/About.css'
import { getUserById } from '../../util/apiCalls/getRequests';
import { useHistory } from "react-router-dom";

const About = () => {
    const history = useHistory();
    const { id } = useParams();
    const [ aboutUser, setAboutUser ] = useState({})
    const [ aboutLanguage, setAboutLanguage ] = useState({})
    const getUserInfo = async () => {
        try {
            const data = await getUserById(id)
            setAboutUser(data.user)
        } catch (error) {
            console.log(error)
        }
    };
    const handleClick = () => {
        // e.preventDefault()
        // UpdateProfile()
        return ({}
            
        )
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <>
        <div className="aboutPage">
           
                <img src={aboutUser.profile_picture} alt="profile_picture" className="aboutUserProfilePic" />
        </div>
        <form onClick={handleClick} >
                <button className="aboutEditBtn" to="/user/updateProfile">Edit</button>
        </form>
        <div className="aboutParagraph">
                <p><span className="boldFont">Full Name: </span>{aboutUser.full_name}</p>
                <p><span className="boldFont">Country Of Origin: </span> {aboutUser.country_of_origin}</p>
                <p><span className="boldFont">Age: </span>{aboutUser.age} years old</p>
                <p><span className="boldFont">Language: </span>{aboutUser.language}</p>
        </div>
        </>
    )
}

export default About;

