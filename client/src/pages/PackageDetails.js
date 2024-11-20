import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MDBInput, MDBBtn, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';

//import '../styles/packageDetails.css';

export default function PackageDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hooks must be defined unconditionally
  const [seats, setSeats] = useState('');
  const [rooms, setRooms] = useState('');
  const [roomType, setRoomType] = useState('Standard');

  // Access pkgData from state
  const pkgData = location.state?.pkgData;

  if (!pkgData) {
    alert('Invalid access. Returning to the home page.');
    navigate('/');
    return null;
  }

  const handleSubmit = () => {
    if (!seats || !rooms) {
      alert('Please fill out all fields.');
      return;
    }

    console.log('Booking Details:', { bundleId: pkgData.bundleId, seats, rooms, roomType });
    alert('Booking successful!');
    navigate('/');
  };

  return (
    <div className="package-booking-page-container">
      <h2>Book Your Package</h2>
      <div className="form-section">
        <MDBInput
          label="Number of Seats"
          type="number"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
        />
        <MDBInput
          label="Number of Rooms"
          type="number"
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
        />
        <MDBDropdown>
          <MDBDropdownToggle>{roomType}</MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem onClick={() => setRoomType('Standard')}>Standard</MDBDropdownItem>
            <MDBDropdownItem onClick={() => setRoomType('Deluxe')}>Deluxe</MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
        <MDBBtn onClick={handleSubmit}>Confirm Booking</MDBBtn>
      </div>
    </div>
  );
}
