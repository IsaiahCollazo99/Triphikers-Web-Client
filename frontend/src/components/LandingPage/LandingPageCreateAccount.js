import React from 'react';

const LandingPageCreateAccount = ({ redirect }) => {
    return (
        <button onClick={redirect} className="lp-orange">
            JOIN
        </button>
    )
}

export default LandingPageCreateAccount;