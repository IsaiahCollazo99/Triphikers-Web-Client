import React from "react";
import { signUpWithGoogle, signUpWithFacebook, signUpWithTwitter } from "../../util/firebaseFunction";

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
      {/* <button className="twitterButton" onClick={handleTwitterClick}> 
        SIGN UP WITH TWITTER
      </button> */}
      <button className="facebookButton" onClick={handleFBookClick}>
          SIGN UP WITH FACEBOOK
      </button>

      <button className="googleButton" onClick={handleGoogleClick}>
          SIGN UP WITH GOOGLE
      </button>

      <button className="emailButton" onClick={handleEmailClick}>
          SIGN UP WITH EMAIL
      </button>
    </section>
    </>
  )
}

export default SignUpMethod;
