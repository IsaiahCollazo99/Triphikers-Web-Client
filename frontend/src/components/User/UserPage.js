import React, { useEffect, useState, useContext } from 'react';
import { useParams, Switch, Route } from 'react-router-dom'
import { getUserById, getUserTrips } from '../../util/apiCalls/getRequests'
import { AuthContext } from '../../providers/AuthContext';
import { getTripById } from '../../util/apiCalls/getRequests';
import '../../css/userPage/userPage.css'
import UserPageNav from './UserPageNav';
import TripCard from '../General/TripCard';

const UserPage = () => {
    const { id } = useParams();
    const { currentUser } = useContext(AuthContext);
    const [ profileUser, setProfileUser ] = useState({});
    const [userTrips, setUserTrips] = useState([]);

    const getUser = async () => {
        try {
            const data = await getUserById(id);
            setProfileUser(data.user)
            getUserTripsCall(data.user);
            
       } catch (error) {
            console.log(error)
        }
    }
    
    const getUserTripsCall = async () => {
        try {
            const data = await getUserTrips(profileUser.id);
            setUserTrips(data.userTrips);

        } catch(error) {
            console.log(error)
        }
        
    }
        
    useEffect(() => {
        getUser();

        return () => {
            setProfileUser(null);
        }
    }, [id]);

    useEffect(() => {
        if(profileUser) {
            getUserTripsCall()
        }
    }
    , [profileUser])
    
    const userTripsList = userTrips.map((trip, i) => {
        return (
            <TripCard trip={trip} refresh={getUserTripsCall} key={i} />
        )
    })

    return (
      
        <div className="userPageContainer">
            <header>
                <section className="up-coverImage">
                </section>

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

            <UserPageNav userId={profileUser.id} />

            <Switch>
                <Route exact to={`/user/${profileUser.id}/trips`}>
                    {userTripsList}
                </Route>
                <Route exact to={`/user/${profileUser.id}/about`}>
                    about
                </Route>
            </Switch>
        
        </div>
    )
}


export default UserPage;

