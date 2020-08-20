import React, { useEffect, useState, useContext } from 'react';
import { useParams, Switch, Route } from 'react-router-dom'
import { getUserById, getUserTrips } from '../../util/apiCalls/getRequests'
import '../../css/userPage/userPage.css'
import UserPageNav from './UserPageNav';
import TripCard from '../General/TripCard';
import UserPageAbout from './UserPageAbout';
import { AuthContext } from '../../providers/AuthContext';

const UserPage = () => {
    const { id } = useParams();
    const { currentUser } = useContext(AuthContext);
    const [ profileUser, setProfileUser ] = useState({});
    const [ userTrips, setUserTrips ] = useState([]);

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
            const data = await getUserTrips(id);
            setUserTrips(data.userTrips);

        } catch(error) {
            console.log(error)
        }
        
    }
        
    useEffect(() => {
        getUser();
        getUserTripsCall();

        return () => {
            setProfileUser(null);
        }
    }, [id]);

    const displayFriendRequest = () => {
        if(currentUser.id === id) {
            return null;
        } else {
            return <button className="up-friendRequest">Send Friend Request</button>
        }
    }
    
    const userTripsList = userTrips.map((trip, i) => {
        return (
            <TripCard trip={trip} refresh={getUserTripsCall} key={i} />
        )
    })

    return (
      
        <div className="userPageContainer">
            <header className="up-header">
                <section className="up-coverImage">
                    {displayFriendRequest()}
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

            <UserPageNav userId={id} />
            
            <section className="up-main">
            <Switch>
                <Route exact path={"/user/:id/"}>
                    {userTripsList}
                </Route>

                <Route exact path={"/user/:id/about"}>
                    <UserPageAbout user={profileUser} />
                </Route>
            </Switch>
            </section>
        
        </div>
    )
}


export default UserPage;

