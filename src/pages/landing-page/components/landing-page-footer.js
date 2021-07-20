import React from "react";
import { Whatsapp, Facebook, Twitter } from "react-social-sharing";

import "./landing-page-footer.css";

const LandingPageFooter = () => {
    return (
        <footer>
          <nav className="footer">
            <p className="copyrightLine">© Triphikers LLC. 2020-2020. All rights reserved</p>
            <div className="shareSocial">
              <Twitter
                link="https://triphikers.netlify.app/"
                title="Want to meet and travel with other people? Check out Triphikers!"
              />
              <Facebook
                link="https://triphikers.netlify.app/"
                quote="Want to meet and travel with other people? Check out Triphikers!"
              />
              <Whatsapp
                link="https://triphikers.netlify.app/"
                title="Want to meet and travel with other people? Check out Triphikers!"
              />
            </div>
          </nav>
        </footer>
      );
}

export default LandingPageFooter;