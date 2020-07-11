import React from 'react';
import '../../css/landingPage/landingPageNav.css';
import { NavLink } from 'react-router-dom';

const LandingPageNav = () => {
    return (
        <nav className="lp-nav">
            <section className="lp-navLeft">
                {/* Logo Here */}
                <h1>TRIPHIKERS</h1>
            </section>

            <section className="lp-navRight">
                <NavLink to="/">ABOUT</NavLink>
                <NavLink to="/">SAFETY</NavLink>
                <NavLink to="/">CREATE ACCOUNT</NavLink>
                <NavLink to="/">LOG IN</NavLink>
            </section>
        </nav>
    )
}

export default LandingPageNav;