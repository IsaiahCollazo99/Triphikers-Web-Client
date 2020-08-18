import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom'
import { getUserById } from '../../util/apiCalls/getRequests'
import { AuthContext } from '../../providers/AuthContext';
import { getTripById } from '../../util/apiCalls/getRequests';
import TripsPage from '../TripsPage/TripsPage';
import '../../css/userPage/userPage.css'

const UserPage = () => {
    const { id } = useParams();
    const { currentUser } = useContext(AuthContext);
    const [ profileUser, setProfileUser ] = useState({});
    const [userTrips, setUserTrips] = useState([]);
    const getUser = async () => {
        try {
            const data = await getUserById(id);
            setProfileUser(data.user)
            getUserTrips(data.user);
            
       } catch (error) {
            console.log(error)
        }
    }
    
    const getUserTrips = async ( user ) => {
        try {
            const data = await getTripById(user.id);
            debugger
            setUserTrips(data.trip)

        } catch(error) {
            console.log(error)
        }
        
    }
        
    useEffect(() => {
        getUser();
    }, []);
    
    
    return (
      
        <div className="userPageContainer">
            <header>
            </header>

            <section className="userProfile">
                <header className="up-header">
                    <section className="up-user">
                        <img src={profileUser.profile_picture} alt="profile_picture" />
                        <div className="up-userInteraction">
                            {/* rating goes in the span */}
                            <p>{profileUser.full_name}<span></span></p>
                            <section>
                                {/* Social Media goes here */}
                            </section>
                        </div>
                    </section>

                    <section className="up-userInfo">
                        <p><span>Age: </span>{profileUser.age}</p>
                        <p><span>Country of Origin: </span>{profileUser.country_of_origin}</p>
                        <p><span>Gender: </span>{profileUser.gender}</p>
                    </section>

                    <section className="up-bio">
                        <span>Bio: </span>
                        <p>{profileUser.bio}</p>
                    </section>
                </header>
            </section>
            <section>
                <TripsPage/>
            </section>
        
        </div>
    )
}


export default UserPage;

