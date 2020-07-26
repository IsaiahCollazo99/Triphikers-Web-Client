import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom'
import { aboutUserById } from '../../util/apiCalls/getRequests'
import { AuthContext } from '../../providers/AuthContext';
import { getTripById } from '../../util/apiCalls/getRequests';
import {userPage} from './UserPage'
const About = () => {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  // const [userTrip, setUserTrip] = useState({});
  console.log(currentUser)
  const [ loggedUser, setLoggedUser ] = useState({});
  const getUser = async () => {
         try {
          // const data = await getUserById(id);
          const data = await aboutUserById(id);
           
           
           debugger
             setLoggedUser(data.user)
            
       } catch (error) {
            console.log(error)
        }
    }
    
    // const getTripOfUser = async() => {
    //     try {
    //         const data = await getTripById(id);
    //         setUserTrip(data.trip)

    //     } catch(error) {
    //         console.log(error)
    //     }
        
    // }
        
    useEffect(() => {
        getUser();
        // getTripOfUser();
    }, []);
    
    
    return (
   
            <div className="aboutUser">
                <div className="imageDiv">
                    <img src={loggedUser.profile_picture} alt="profile_picture" className="userProfilePicture" />
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
            <p>{loggedUser.gender}</p>
            <p>Country Of Origin: {loggedUser.country_of_origin}</p>
            <p>Age: {loggedUser.age} years old</p>
            {/* <p>Language: {userTrip.language}</p> */}
          </div> 
       
    )
}

export default About;

