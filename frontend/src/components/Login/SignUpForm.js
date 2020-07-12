import React from "react";
import { Link }from "react-router-dom"



const SignUpForm = () => {
  
  return (
    <div>

      <div>
        <h1>CREATE AN ACCOUNT</h1>
      </div>
      <div>
      <button className="signIpBtn">
          <Link to="/signUp_facebook">
            SIGN UP WITH FACEBOOK
					</Link>
        </button>
      </div>
      <div>
      <button className="signIpBtn">
          <Link to="/signUp_google">
            SIGN UP WITH GOOGLE
					</Link>
        </button>
      </div>
      <div>
      <button className="signIpBtn">
          <Link to="/signUp_email">
            SIGN UP WITH EMAIL
					</Link>
        </button>
      </div>

    </div>
  )
}

export default SignUpForm;
