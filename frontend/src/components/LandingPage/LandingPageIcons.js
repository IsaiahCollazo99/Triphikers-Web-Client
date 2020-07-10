import React from 'react';
import { FaBook, FaUsers, FaPlane } from 'react-icons/fa';

const LandingPageIcons = () => {
    return (
        <section className="lp-icons"> 
          <article>
            <FaBook />
            <p>CREATE A PLAN</p>
          </article>

          <article>
            <FaUsers />
            <p>FIND BUDDIES</p>
          </article>

          <article>
            <FaPlane />
            <p>TRAVEL</p>
          </article>
        </section>
    )
}

export default LandingPageIcons;