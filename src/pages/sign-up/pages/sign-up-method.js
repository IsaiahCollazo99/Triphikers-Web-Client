import React from "react";

import { signUpWithGoogle, signUpWithFacebook, signUpWithTwitter } from "../../../util/firebase-functions";
import googleLogo from '../../../images/btn_google_light_normal_ios.svg'
import fBookLogo from '../../../images/f_logo_RGB-Blue_1024.png'
import './brand-buttons.css';

const SignUpMethod = ({ handlePageChange, setUser }) => {

  const handleTwitterClick = async () => {
    // REQUIRES TERMS AND CONDITIONS
    let result = await signUpWithTwitter();
    setUser(result.user);
  }

  const handleFBookClick = async () => {
    let result = await signUpWithFacebook();
    setUser(result.user);
  }

  const handleGoogleClick = async () => {
    let result = await signUpWithGoogle();
    setUser(result.user);
  }

  const handleEmailClick = async () => {
    handlePageChange(1);
  }
  
  return (
    <>
    <header>
      <h1>CREATE AN ACCOUNT</h1>
    </header>

    <section className="signUpMethod">
      <button className="twitterButton" onClick={handleTwitterClick}> 
        SIGN UP WITH TWITTER
      </button>
      <button className="facebookButton" onClick={handleFBookClick}>
          <img src={fBookLogo} alt="Facebook Logo" />
          <p>Continue with Facebook</p>
      </button>

      <button className="googleButton" onClick={handleGoogleClick}>
        <img src={googleLogo} alt="Google Logo" />
          SIGN UP WITH GOOGLE
      </button>

      <button className="triphikersButton" onClick={handleEmailClick}>
          SIGN UP WITH EMAIL
      </button>


    </section>
    </>
  )
}

export default SignUpMethod;
