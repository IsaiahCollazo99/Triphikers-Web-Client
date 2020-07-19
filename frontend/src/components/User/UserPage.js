import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom'
import { getUserById } from '../../util/apiCalls/getRequests'
import DetailedTripPage from '../DetaliedTripPage/DetailedTripPage';
import { AuthContext } from '../../providers/AuthContext';
import { getTripById } from '../../util/apiCalls/getRequests';

const UserPage = () => {
    const { id } = useParams();
    console.log(id)
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
      
        <>
            <div>NavBar</div>
            <DetailedTripPage /> 
            <img src={loggedUser.profile_picture} alt=""/>
            <h2>Hello, I am {loggedUser.full_name}</h2>
            <p>{loggedUser.country_of_origin}</p>
            <p>{loggedUser.gender}</p>
            <p>{loggedUser.age}</p>
            <p>{userTrip.language}</p>
            <div>
                <p>{userTrip.trip_title}</p>
                <div>
                <p>Trip Date: </p>
                    <h4><strong>From:</strong> {userTrip.date_from} <span><strong> To: </strong>{userTrip.date_to}</span></h4>
                    <p>Description: {userTrip.description}</p>
                    <img src={userTrip.profile_picture} alt=""/>
                </div>
                
            </div>
        </>
    )
}

export default UserPage;

// accommodation: "Hotel"
// age: 20
// before_trip_meetup: "Video Call"
// bio: "Hello"
// budget: 1000
// country_of_origin: "USA"
// date_from: "10/01/2020"
// date_to: "10/10/2020"
// description: "Just want to explore around cities with my friends and some new people"
// destination: "England"
// first_time: "Yes"
// full_name: "Isaiah Collazo"
// gender: "Male"
// group_type: "Any"
// id: 1
// is_completed: false
// itinerary: "None"
// language: "English"
// planner_id: "1"
// profile_picture: "https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
// split_costs: "Yes"
// trip_title: "Exploring England"
// trip_type: "Explore Cities"
// user_id: "1"