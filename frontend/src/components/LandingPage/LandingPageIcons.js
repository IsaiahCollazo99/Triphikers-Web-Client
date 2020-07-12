import React from 'react';
import { FaBook, FaUsers, FaPlane } from 'react-icons/fa';

const LandingPageIcons = ({ redirect }) => {
    return (
        <section className="lp-icons"> 
          <article onClick={redirect}>
            <FaBook size="2em" />
            <h3>CREATE A PLAN</h3>
          </article>

          <article onClick={redirect}>
            <FaUsers size="2em" />
            <h3>FIND TRAVELERS</h3>
          </article>

          <article onClick={redirect}>
            <FaPlane size="2em" />
            <h3>TRAVEL</h3>
          </article>
        </section>
    )
}

export default LandingPageIcons;