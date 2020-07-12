import React from 'react';
import '../../css/landingPage/landingPageNav.css';
import { NavLink, Link } from 'react-router-dom';

const LandingPageNav = () => {
    return (
        <nav className="lp-nav">
            <section className="lp-navLeft">
                {/* Logo Here */}
                <h1><Link to="/">TRIPHIKERS</Link></h1>
            </section>

            <section className="lp-navRight">
                <NavLink to="/">ABOUT</NavLink>
                <NavLink to="/safety">SAFETY</NavLink>
                <NavLink to="/signUp">CREATE ACCOUNT</NavLink>
                <NavLink to="/signIn">LOG IN</NavLink>
            </section>
        </nav>
    )
}

export default LandingPageNav;