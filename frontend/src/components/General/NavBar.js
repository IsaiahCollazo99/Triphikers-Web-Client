import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const displayCreateTrip = () => {
    const location = useLocation();
    debugger;
}

const NavBar = () => {
    return (
        <nav className="mainNav">
            <section className="mainNav-left">
                {/* Logo Here */}
                <h1><Link to="/trips">TRIPHIKERS</Link></h1>
            </section>

            <section className="mainNav-right">
                {displayCreateTrip()}
                <NavLink to="/trips">TRIPS</NavLink>
                {/* When State management is added updated from /profile to /user/:userId */}
                <NavLink to="/profile">PROFILE</NavLink>
            </section>
        </nav>
    )
}

export default NavBar;