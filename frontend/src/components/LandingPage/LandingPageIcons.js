import React from 'react';
import { FaBook, FaUsers, FaPlane } from 'react-icons/fa';

const LandingPageIcons = () => {
    return (
        <section className="lp-icons"> 
          <article>
            <FaBook size="2em" />
            <h3>CREATE A PLAN</h3>
          </article>

          <article>
            <FaUsers size="2em" />
            <h3>FIND BUDDIES</h3>
          </article>

          <article>
            <FaPlane size="2em" />
            <h3>TRAVEL</h3>
          </article>
        </section>
    )
}

export default LandingPageIcons;