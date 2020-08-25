import React, { useContext, useState , useEffect} from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import '../../css/general/navBar.css';
import { logout } from '../../util/firebaseFunction';
import { AuthContext } from '../../providers/AuthContext';
import firebase from "../../firebase";
import Navbar from "../Navbar/Navbar";
import NavItem from "../Navbar/NavItem"
import {getUserById} from '../../util/apiCalls/getRequests';


const NavBar = () => {
    const { currentUser } = useContext(AuthContext);

    const [firstName , setFirstName]= useState("")
    const location = useLocation();
    
    
    
    const isOnTripsPage = location.pathname === "/trips";
    const isOnCreateTripsPage = location.pathname === "/trips/create";

    const displayCreateTrip = () => {
        if(isOnTripsPage || isOnCreateTripsPage) {
            return null
        } else {
            return (
                <NavLink to="/trips/create">CREATE A TRIP</NavLink>
            )
        }
    }
    

    // const fetchFirstName = () => {
    //     firebase.auth().onAuthStateChanged(async user => {
    //         debugger
    //         setFirstName(user.displayName.split(" ")[0])
    //     })
    // }
    // console.log(firstName)

    const getFirstName = async () => {
        const data = await getUserById(currentUser.id);
        setFirstName(data.user.first_name);
     
    }

    const displayNavBar = () => {
        if(currentUser) {
            return (
                <section className="mainNav-right">
                    {displayCreateTrip()}
                    <NavLink exact to="/trips">TRIPS</NavLink>
                    <NavLink to={`/user/${currentUser.id}`}>PROFILE</NavLink>
                    <NavLink to="/search">CITY SEARCH</NavLink>
                    <NavLink to="/messages">MESSAGES</NavLink>
                    {/* <Navbar> */}
                        {/* <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle"
                                        href="#"
                                        id="navbarDropdown"
                                        role="button" data-toggle="dropdown"
                                        >Hi, {firstName}</a> */}
                                    {/* >Hi, {firstName}</a> */}
                        {/* <NavLink to={`/user/${firstName}`}
                            className="NaveItem dropdown"
                            href="#" id="navbarDropdown"
                            role="button" data-toggle="dropdown"
                                    >Hi, {firstName}</NavLink> */}
                                {/* </li>
                                

                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">PROFILE</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">PROFILE</a>
                            
                                </div>
                                </ul>
                    </div> */}
                    {/* </Navbar> */}


                    <div class="dropdown">
  <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
    Hi, {firstName}
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Profile</a>
    <a class="dropdown-item" href="#">Profile2</a>
    <a class="dropdown-item" href="#">Link 3</a>
  </div>
</div>

                    
                    <a onClick={redirect}>LOG OUT</a>
                </section>
            )
        } else {
            return (
                <section className="lp-navRight">
                    <NavLink exact to="/">ABOUT</NavLink>
                    <NavLink to="/safety">SAFETY</NavLink>
                    <NavLink to="/signUp">CREATE ACCOUNT</NavLink>
                    <NavLink to="/signIn">LOG IN</NavLink>
                </section>
            )
        }
    }

    const redirect = async () => {
        await logout();
    }

    useEffect(() => {
        getFirstName();
    }, [])


    // useEffect(() => {
    //     fetchFirstName()
    // }, [])
    
    return (
        <nav className="mainNav">
            <section className="mainNav-left">
                {/* Logo Here */}
                <h1><Link to={currentUser ? "/trips" : "/"}>TRIPHIKERS</Link></h1>
            </section>

            {displayNavBar()}
        </nav>
    )
}

export default NavBar;