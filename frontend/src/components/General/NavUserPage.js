import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthContext';
import '../../css/userPage/NavUserPage.css'

const NavUserPage = () => {
 
    
  const { currentUser } = useContext(AuthContext);
  
  if (currentUser) {
    return (
      <section className="navUser">
        <NavLink exact to="/trips" className="userNavTrip active">Trips</NavLink>
        <NavLink to={`/user/${currentUser.id}/about`} className="userNavAbout active">About</NavLink>
      </section>
    )
  }
  
}

  export default NavUserPage;