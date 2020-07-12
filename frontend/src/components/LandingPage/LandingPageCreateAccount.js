import React from 'react';

const LandingPageCreateAccount = ({ redirect }) => {
    return (
        <button onClick={redirect} className="lp-createAccount">
            JOIN
        </button>
    )
}

export default LandingPageCreateAccount;