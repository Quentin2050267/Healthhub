import React, { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "../../styles/Header.css";
import { RiHomeFill, RiBook2Fill, RiNurseFill, RiHospitalFill, RiCommunityFill } from 'react-icons/ri';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth hook
import { googleLogout } from '@react-oauth/google';
import { Dropdown } from 'react-bootstrap'; // Import Dropdown component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const navLinks = [
  {
    title: "Home",
    to: "/",
    icon: <RiHomeFill />,
  },
  {
    title: "Hospitals",
    to: "/hospitals",
    icon: <RiHospitalFill />,
  },
  {
    title: "E-Record",
    to: "/records",
    icon: <RiBook2Fill />,
  },
  {
    title: "Community",
    to: "/community",
    icon: <RiCommunityFill />,
  },
  {
    title: "About",
    to: "/about",
    icon: <RiNurseFill />,
  },
];

/**
 * Header component
 * This component renders the header section of the website, including navigation links and user authentication options.
 */
function Header() {
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  /**
   * handleLogout
   * Logs out the user by calling the googleLogout and logout functions.
   */
  const handleLogout = () => {
    googleLogout();
    logout();
  };

  return (
    <div className="app-header">
      <div className="header-container">
        <Link to="/" className="logo-container">
          <div className="flex items-center">
            <img width={35} src="\icon.svg" alt="Logo" />
            <span className="text-lg font-bold text-blue-700">HEALTH HUB</span>
          </div>
        </Link>
        <ul className="navigation-links">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink to={link.to} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
                {link.icon}
                {link.title}
              </NavLink>


            </li>
            
          ))}
  

        </ul>
        <div className="login-links">
            <a
              id="wzayd"
              title="website information accessibility toolbar"
              href="javascript:;"
              className="wzayd text-lg accessible-reading"
              accessKey="g"
              style={{ cursor: "pointer" }}
            >
              Assistive
            </a>


          {user ? (
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Welcome, {user.given_name}
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu">
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <>
              <Link to="/login" className="login">Login</Link>
              <Link to="/signup">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;