import React from "react";
import { Link }from "react-router-dom"



const Signup = () => {
  
  return (
    <div>

      <div>
        <h1>CREATE AN ACCOUNT</h1>
      </div>
      <div>
      <button className="signIpBtn">
          <Link to="/signUpFacebook">
            SIGN UP WITH FACEBOOK
					</Link>
        </button>
      </div>
      <div>
      <button className="signIpBtn">
          <Link to="/signUpGoogle">
            SIGN UP WITH GOOGLE
					</Link>
        </button>
      </div>
      <div>
      <button className="signIpBtn">
          <Link to="/signUp1">
            SIGN UP WITH EMAIL
					</Link>
        </button>
      </div>

    </div>
  )
}

export default Signup;
