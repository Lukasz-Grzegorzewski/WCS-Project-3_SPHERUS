import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaInstagramSquare,
  FaFacebookSquare,
  FaTwitterSquare,
} from "react-icons/fa";

function Footer() {
  return (
    <div className="footer">
      <div className="footer_container_logo">
        <NavLink to="/">
          <img
            className="footer_logo"
            src="././src/assets/images/logo_sphereus.png"
            alt="sphereus"
          />
        </NavLink>
      </div>
      <div className="footer_social">
        <a href="https://www.instagram.com">
          <FaInstagramSquare className="footer_social_icon" />
        </a>
        <a href="https://www.facebook.com">
          <FaFacebookSquare className="footer_social_icon" />
        </a>
        <a href="https://www.twitter.com">
          <FaTwitterSquare className="footer_social_icon" />
        </a>
      </div>
      <div className="footer_link">
        <NavLink to="/policy">
          <p>Privacy Policy</p>
        </NavLink>
        <NavLink to="/cookies">
          <p>Cookies</p>
        </NavLink>
        <NavLink to="/termsofservices">
          <p>Terms of Services</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Footer;
