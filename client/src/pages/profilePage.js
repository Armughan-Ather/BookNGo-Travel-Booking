// ProfilePage.js
import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBBtn, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import '../styles/profilePage.css'; 
import { AuthContext } from '../Context/AuthContext';

export default function ProfilePage() {
    const { user, isAuthenticated } = useContext(AuthContext);

  const userName = user?.username;

  const [hotelBookings, setHotelBookings] = useState([]);
  const [flightBookings, setFlightBookings] = useState([]);
  const [packageBookings, setPackageBookings] = useState([]);
  
  
  
  useEffect(() => {
    if (userName) {
      axios.post('/api/getUserHotels', { userName })
        .then(response => setHotelBookings(response.data.data))
        .catch(error => console.error('Error fetching hotel bookings:', error));

      axios.post('/api/getUserFlights', { userName })
        .then(response => setFlightBookings(response.data.data))
        .catch(error => console.error('Error fetching flight bookings:', error));

      axios.post('/api/getUserPackages', { userName })
        .then(response => setPackageBookings(response.data.data))
        .catch(error => console.error('Error fetching package bookings:', error));
    }
  }, [userName]);

  const renderBookingCard = (booking, type) => {
    const isUpcoming = new Date(booking.date) > new Date();
    return (
      <MDBCard className="mb-3 view-user-profile-comp-card" key={`${type}-${booking.id}`}>
        <MDBCardBody>
          <MDBCardTitle className="view-user-profile-comp-card-title">{type} Booking</MDBCardTitle>
          <p><strong className="view-user-profile-comp-label">Name:</strong> {booking.name}</p>
          <p><strong className="view-user-profile-comp-label">Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
          <p><strong className="view-user-profile-comp-label">Location:</strong> {booking.location}</p>
          <div className="view-user-profile-comp-button-group">
            {isUpcoming ? (
              <MDBBtn color="danger" size="sm">Cancel Reservation</MDBBtn>
            ) : (
              <MDBBtn color="primary" size="sm">Give Rating</MDBBtn>
            )}
          </div>
        </MDBCardBody>
      </MDBCard>
    );
  };

  return (
    <MDBContainer className="view-user-profile-comp-container">
      <MDBRow>
        <MDBCol md="4">
          <h3 className="view-user-profile-comp-heading">Hotel Bookings</h3>
          {hotelBookings.map(booking => renderBookingCard(booking, 'Hotel'))}
        </MDBCol>
        <MDBCol md="4">
          <h3 className="view-user-profile-comp-heading">Flight Bookings</h3>
          {flightBookings.map(booking => renderBookingCard(booking, 'Flight'))}
        </MDBCol>
        <MDBCol md="4">
          <h3 className="view-user-profile-comp-heading">Package Bookings</h3>
          {packageBookings.map(booking => renderBookingCard(booking, 'Package'))}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
