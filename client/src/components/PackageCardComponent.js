import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import { RiStarSFill, RiStarHalfSFill, RiStarLine } from 'react-icons/ri';
import '../styles/packageCardComponent.css';

// Wrap the component with React.memo
const PackageCardComponent = React.memo((props) => {
  // Convert ISO date format to local date string
  const formatDate = (isoDate) => new Date(isoDate).toLocaleString();

  // Calculate number of days
  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const noOfDays = calculateDays(props.departureDate, props.returnDate);

  // Calculate stars for ratings
  const fullStars = Math.floor(props.Rating);
  const halfStars = props.Rating % 1 > 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<RiStarSFill key={`full-${i}`} className="packages-results-card-comp-ratings-stars" />);
  }
  if (halfStars) {
    stars.push(<RiStarHalfSFill key="half" className="packages-results-card-comp-ratings-stars" />);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<RiStarLine key={`empty-${i}`} className="packages-results-card-comp-ratings-stars-notfilled" />);
  }

  return (
    <MDBCard className="packages-results-card-comp-card">
      <MDBCardBody>
        <MDBCardTitle className="packages-results-card-comp-title">
          {props.origin} ➡ {props.destination}
        </MDBCardTitle>
        <MDBCardText className="packages-results-card-comp-text">
          <strong>Onboard Date:</strong> {formatDate(props.departureDate)}
          <br />
          <strong>Departure Airline:</strong> {props.departureAirline}
          <br />
          <strong>Hotel Name:</strong> {props.hotelName}
          <br />
          <strong>Return Date:</strong> {formatDate(props.returnDate)}
          <br />
          <strong>Return Airline:</strong> {props.returnAirline}
          <br />
          <strong>No. of Days:</strong> {noOfDays}
          <br />
          <div className="packages-results-card-comp-ratings-container">{stars}</div>
        </MDBCardText>
        <MDBBtn className="packages-results-card-comp-book-button">Book Now</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
});

// Export the memoized component
export default PackageCardComponent;
