import React from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import '../styles/packageCardComponent.css';

export default function PackageCardComponent({ packageData }) {
  const { packageName, flights, hotel, totalPrice, description, imageUrl } = packageData;

  return (
    <MDBCard className="packages-results-card-comp-card">
      <MDBCardImage src={imageUrl || 'default-image.jpg'} alt={packageName} position="top" className="packages-results-card-comp-img" />
      <MDBCardBody>
        <MDBCardTitle className="packages-results-card-comp-title">{packageName}</MDBCardTitle>
        <MDBCardText className="packages-results-card-comp-text">
          <strong>Flights:</strong> {flights.map((flight, i) => (
            <span key={i}>{flight.origin} to {flight.destination}</span>
          ))}
          <br />
          <strong>Hotel:</strong> {hotel.name} in {hotel.location}
          <br />
          <strong>Price:</strong> ${totalPrice}
          <br />
          <strong>Description:</strong> {description}
        </MDBCardText>
        <MDBBtn className="packages-results-card-comp-book-button">Book Now</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}
