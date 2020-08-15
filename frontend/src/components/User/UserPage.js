import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom'
import { getUserById } from '../../util/apiCalls/getRequests'
import DetailedTripPage from '../DetaliedTripPage/DetailedTripPage';
import { AuthContext } from '../../providers/AuthContext';
import { getTripById } from '../../util/apiCalls/getRequests';
import TripCard from '../General/TripCard';
import TripsPage from '../TripsPage/TripsPage';
import '../../css/userPage/userPage.css'
import albertaAttraction from '../../images/albertaAttraction.jpg';
import NavUserPage from '../General/NavUserPage'


const UserPage = () => {
    const { id } = useParams();
    const { currentUser } = useContext(AuthContext);
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
            debugger
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
            
            <div>
              
                <div >
                    {/* {userTrip} */}
              
                 </div> 
    
                    <TripsPage/>
                </div>
                
            
        </div>
    )
}


export default UserPage;

