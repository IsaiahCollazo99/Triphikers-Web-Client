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


        </nav>
    )
}

export default LandingPageNav;