import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom'
import { getUserById } from '../../util/apiCalls/getRequests'
import DetailedTripPage from '../DetaliedTripPage/DetailedTripPage';
import { AuthContext } from '../../providers/AuthContext';
import { getTripById } from '../../util/apiCalls/getRequests';
import TripCard from '../General/TripCard';
import TripsPage from '../TripsPage/TripsPage';
import '../../css/userPage/UserPage.css'
import albertaAttraction from '../../images/albertaAttraction.jpg';
import NavUserPage from '../General/NavUserPage'


const UserPage = () => {

    const { id } = useParams();
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser)
    const [ loggedUser, setLoggedUser ] = useState({});
    const [userTrip, setUserTrip] = useState({});
    const getUser = async () => {
         try {
           const data = await getUserById(id);
             setLoggedUser(data.user)
            
       } catch (error) {
            console.log(error)
        }
    }
    
    const getTripOfUser = async() => {
        try {
            const data = await getTripById(id);
            setUserTrip(data.trip)

        } catch(error) {
            console.log(error)
        }
        
    }
        
    useEffect(() => {
        getUser();
        getTripOfUser();
    }, []);
    
    
    return (
      
        <div className="userPageContainer">
           
            <hr  style={{
                color: '#000000',
                backgroundColor: '#000000',
                height: 1.5,
                borderColor: '#000000',
                margin: 0,
                border: 0,
                }}
            />
            <div className="userPageCoverImage">
                <img src={albertaAttraction} alt="user_cover_image" className="coverImage" />
                <button className="editBtn" >Edit</button>
            </div>
            <hr  style={{
                color: '#000000',
                backgroundColor: '#000000',
                height: 1.5,
                borderColor: '#000000',
                margin: 0,
                border: 0,
                }}
            />
            <div className="userProfile">
                <div className="imageDiv">
                    <img src={loggedUser.profile_picture} alt="profile_picture" className="userProfilePicture" />
                </div>
                <div className="greeting">
                    <h2>Hello, I am {loggedUser.full_name}</h2>
                </div>
            </div>
            <hr  style={{
                color: '#000000',
                backgroundColor: '#000000',
                height: 1.5,
                borderColor: '#000000',
                margin: 0,
                border: 0,
                }}
            />
            <div className="navUserPage">
            </div>
                <NavUserPage/>
            <hr  style={{
                color: '#000000',
                backgroundColor: '#000000',
                height: 1.5,
                borderColor: '#000000',
                margin: 0,
                border: 0,
                }}
            />
            <p>{loggedUser.gender}</p>
            <p>Country Of Origin: {loggedUser.country_of_origin}</p>
            <p>Age: {loggedUser.age} years old</p>
            <p>Language: {userTrip.language}</p>
            <div>
                <p>{userTrip.trip_title}</p>
                <div>
                <p>Trip Date: </p>
                    <h4><strong>From:</strong> {userTrip.date_from} <span><strong> To: </strong>{userTrip.date_to}</span></h4>
                    <p>Description: {userTrip.description}</p>
                    <img src={userTrip.profile_picture} alt=""/>
                </div>
                <div>
                    <TripsPage/>
                </div>
                
            </div>
        </div>
    )
}


export default UserPage;

