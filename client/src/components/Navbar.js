// import React, { useState } from 'react';
// import "../styles/Navbar.css";
// import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);

//   return (
//     <nav className="navbar-container">
//       <div className="navbar-first-row">
//         <div className="navbar-logo">BOOKNGO</div>
//         <div className="hamburger-icon" onClick={() => setMenuOpen(!menuOpen)}>
//           &#9776;
//         </div>
//       </div>
//       <div className={`navbar-second-row ${menuOpen ? 'active' : ''}`}>
//         <div className="navbar-links-left">
//           <a href="/">
//             <i className="fa fa-home" aria-hidden="true"></i> Home
//           </a>
//           <a href="/flights">
//             <i className="fa fa-plane" aria-hidden="true"></i> Flights
//           </a>
//           <a href="/hotels">
//             <i className="fa fa-bed" aria-hidden="true"></i> Hotels
//           </a>
//           <a href="/packages">
//             <i className="fa fa-suitcase" aria-hidden="true"></i> Packages
//           </a>
//         </div>
//         <div
//           className="user-profile"
//           onMouseEnter={() => setProfileOpen(true)}
//           onMouseLeave={() => setProfileOpen(false)}
//         >
//           <i className="fa fa-user" aria-hidden="true"></i> Profile
//           <div className={`dropdown-menu ${profileOpen ? 'active' : ''}`}>
//             <a href="/edit-user-profile">Edit Profile</a>
//             <a href="/logout">Logout</a>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }


// import React, { useState } from 'react';
// import { FaPlane, FaHotel, FaSuitcase, FaUser } from 'react-icons/fa';
// import '../styles/Navbar.css'; // Custom CSS

// export default function BookNGoNavbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);

//   return (
//     <nav className="custom-navbar">
//       <div className="navbar-container">
//         <div className="navbar-brand">BOOKNGO</div>
//         <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
//           &#9776;
//         </button>
//         <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
//           <a href="/" className="navbar-link">
//             <FaPlane /> Flights
//           </a>
//           <a href="/hotels" className="navbar-link">
//             <FaHotel /> Hotels
//           </a>
//           <a href="/packages" className="navbar-link">
//             <FaSuitcase /> Packages
//           </a>
//           <div 
//             className="navbar-profile" 
//             onMouseEnter={() => setProfileOpen(true)} 
//             onMouseLeave={() => setProfileOpen(false)}
//           >
//             <span className="profile-icon"><FaUser /> Profile</span>
//             <div className={`dropdown-menu ${profileOpen ? 'active' : ''}`}>
//               <a href="/edit-user-profile" className="dropdown-item">Edit Profile</a>
//               <a href="/logout" className="dropdown-item">Logout</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }


// import React, { useState } from 'react';
// import { FaHome, FaPlane, FaBed, FaSuitcase, FaUser } from 'react-icons/fa';
// import "../styles/Navbar.css";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);

//   return (
//     <nav className="custom-navbar">
//       {/* First Row: Logo and Hamburger */}
//       <div className="navbar-first-row">
//         <div className="navbar-logo">BOOKNGO</div>
//         <div className="hamburger-icon" onClick={() => setMenuOpen(!menuOpen)}>
//           &#9776;
//         </div>
//       </div>

//       {/* Second Row: Navigation links and Profile */}
//       <div className={`navbar-second-row ${menuOpen ? 'active' : ''}`}>
//         <div className="navbar-links-left">
//           <a href="/" className="navbar-link">
//             <FaHome /> Home
//           </a>
//           <a href="/flights" className="navbar-link">
//             <FaPlane /> Flights
//           </a>
//           <a href="/hotels" className="navbar-link">
//             <FaBed /> Hotels
//           </a>
//           <a href="/packages" className="navbar-link">
//             <FaSuitcase /> Packages
//           </a>
//         </div>

//         {/* Profile Section */}
//         <div 
//           className="navbar-profile" 
//           onMouseEnter={() => setProfileOpen(true)} 
//           onMouseLeave={() => setProfileOpen(false)}
//         >
//           <FaUser /> Profile
//           <div className={`dropdown-menu ${profileOpen ? 'active' : ''}`}>
//             <a href="/edit-user-profile">Edit Profile</a>
//             <a href="/logout">Logout</a>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }



// import React, { useState } from 'react';
// import { FaHome, FaPlane, FaBed, FaSuitcase, FaUser } from 'react-icons/fa';
// import '../styles/Navbar.css';

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);

    
//   return (
//     <nav className="custom-navbar">
//       {/* First Row: Logo and Hamburger */}
//       <div className="navbar-first-row">
//         <div className="navbar-logo">BOOKNGO</div>
//         <div className="hamburger-icon" onClick={() => setMenuOpen(!menuOpen)}>
//           &#9776;
//         </div>
//       </div>

//       {/* Second Row: Navigation links on left and Profile on right */}
//       <div className="navbar-second-row">
//         <div className={`navbar-links-left ${menuOpen ? 'active' : ''}`}>
//           <a href="/" className="navbar-link">
//             <FaHome /> Home
//           </a>
//           <a href="/flights" className="navbar-link">
//             <FaPlane /> Flights
//           </a>
//           <a href="/hotels" className="navbar-link">
//             <FaBed /> Hotels
//           </a>
//           <a href="/packages" className="navbar-link">
//             <FaSuitcase /> Packages
//           </a>
//         </div>

//         {/* Profile Section on the right */}
//         <div
//           className="navbar-profile"
//           onClick={()=>setProfileOpen((prevState)=>!prevState)}
//         //   onMouseEnter={() => setProfileOpen(true)}
//         //   onMouseLeave={() => setProfileOpen(false)}
//         >
//           <FaUser /> Profile
//           <div className={`dropdown-menu ${profileOpen ? 'active' : ''}`}>
//             <a href="/edit-user-profile">Edit Profile</a>
//             <a href="/logout">Logout</a>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }





import React, { useState } from 'react';
import { FaHome, FaPlane, FaBed, FaSuitcase, FaUser } from 'react-icons/fa';
import '../styles/Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
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

        {/* Profile Section on the right */}
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
  );
}
