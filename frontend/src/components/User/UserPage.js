import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom'
import { getUserById } from '../../util/apiCalls/getRequests'

import Profile from './Profile';
import DetailedTripPage from '../DetaliedTripPage/DetailedTripPage';
import { AuthContext } from '../../providers/AuthContext';

const UserPage = () => {
    const { id } = useParams();
    console.log(id)
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser)
    const [loggedUser, setLoggedUser] = useState({});
    const getUser = async () => {
         try {
           const data = await getUserById(id);
            debugger
             setLoggedUser(data.user)
            
       } catch (error) {
            console.log(error)
        }
     }
    useEffect(() => {
        getUser()
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
        </>
    )
}

export default UserPage;
