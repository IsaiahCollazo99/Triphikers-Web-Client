import React from "react";
import { Whatsapp, Facebook, Twitter } from "react-social-sharing";
import { NavLink } from "react-router-dom";
import "../../css/landingPage/landingPageFooter.css";

const LandingPageFooter = () => {
    return (
        <footer>
          <nav className="footer">
            <NavLink className="footerLinks" exact to ="/about">
              About
            </NavLink>
            <NavLink className="footerLinks" exact to ="/terms&conditions">
              Terms and Conditions
            </NavLink>
            <NavLink className="footerLinks" exact to ="/policy">
              Privacy Policy
            </NavLink>
            <p className="copyrightLine">© Triphikers LLC. 2020-2020. All rights reserved</p>
            <div className="shareSocial">
              <Twitter
                link="http://localhost:3000/"
                title="Want to meet and travel with other people? Check out Triphikers!"
              />
              <Facebook
                link="http://localhost:3000/"
                quote="Want to meet and travel with other people? Check out Triphikers!"
              />
              <Whatsapp
                link="http://localhost:3000/"
                title="Want to meet and travel with other people? Check out Triphikers!"
              />
            </div>
          </nav>
        </footer>
      );
}

export default LandingPageFooter;