import React, { useState } from 'react';
import { FaHome, FaPlane, FaBed, FaSuitcase, FaUser } from 'react-icons/fa';
import '../styles/Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="custom-navbar-padding"> {/* Apply padding class here */}
      <nav className="custom-navbar">
        {/* First Row: Logo and Hamburger */}
        <div className="navbar-first-row">
          <div className="navbar-logo">BOOKNGO</div>
          <div className="hamburger-icon" onClick={() => setMenuOpen(!menuOpen)}>
            &#9776;
          </div>
        </div>

        {/* Second Row: Navigation links on left and Profile on right */}
        <div className={`navbar-second-row ${menuOpen ? 'menu-open' : ''}`}>
          <div className="navbar-links-left">
            <a href="/" className="navbar-link">
              <FaHome /> Home
            </a>
            <a href="/flights" className="navbar-link">
              <FaPlane /> Flights
            </a>
            <a href="/hotels" className="navbar-link">
              <FaBed /> Hotels
            </a>
            <a href="/packages" className="navbar-link">
              <FaSuitcase /> Packages
            </a>
          </div>

          {/* Profile Section */}
          <div
            className="navbar-profile"
            onClick={() => setProfileOpen((prevState) => !prevState)}
          >
            <FaUser /> Profile
            <div className={`dropdown-menu ${profileOpen ? 'active' : ''}`}>
              <a href="/edit-user-profile">Edit Profile</a>
              <a href="/logout">Logout</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
