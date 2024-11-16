import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBBtn, MDBRow, MDBCol, MDBModal, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';
import { FaPlane, FaCalendarAlt, FaUser, FaHotel, FaDollarSign, FaRegCalendarCheck, FaTimesCircle } from 'react-icons/fa';
import { RiStarSFill, RiStarHalfSFill, RiStarLine } from 'react-icons/ri'; // For Star Ratings
import '../styles/profilePage.css'; 
import { AuthContext } from '../Context/AuthContext';

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const username = user?.username;

  const [hotelBookings, setHotelBookings] = useState([]);
  const [flightBookings, setFlightBookings] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [modalMessage, setModalMessage] = useState(''); // State for modal message content

  // State to handle ratings
  const [flightUserRating, setFlightUserRating] = useState({});
  const [hotelUserRating, setHotelUserRating] = useState({});
  const [flightHoveredRating, setFlightHoveredRating] = useState({});
  const [hotelHoveredRating, setHotelHoveredRating] = useState({});

  useEffect(() => {
    if (username) {
      axios.post('http://localhost:8000/api/v1/users/getUserHotelReservationHistory', { username })
        .then(response => setHotelBookings(response.data.hotelReservations || []))
        .catch(error => console.error('Error fetching hotel bookings:', error));

      axios.post('http://localhost:8000/api/v1/users/getUserFlightReservationHistory', { username })
        .then(response => setFlightBookings(response.data.flightReservations || []))
        .catch(error => console.error('Error fetching flight bookings:', error));
    }
  }, [username]);

  // Function to render the stars for ratings
  const renderStars = (rating, bookingId, type) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - Math.ceil(rating);
    const halfStars = rating % 1 > 0 ? 1 : 0;

    let stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<RiStarSFill key={`full-${type}-${bookingId}-${i}`} className="view-user-profile-comp-stars" />);
    }

    if (halfStars) {
      stars.push(<RiStarHalfSFill key={`half-${type}-${bookingId}`} className="view-user-profile-comp-stars" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<RiStarLine key={`empty-${type}-${bookingId}-${i}`} className="view-user-profile-comp-stars-not-filled" />);
    }

    return stars;
  };

  // Handle hover effect for each booking (flight or hotel)
  const handleStarHover = (rating, bookingId, type) => {
    if (type === 'flight') {
      setFlightHoveredRating(prev => ({ ...prev, [bookingId]: rating }));
    } else if (type === 'hotel') {
      setHotelHoveredRating(prev => ({ ...prev, [bookingId]: rating }));
    }
  };

  // Handle rating submission for each booking (flight or hotel)
  const handleStarClick = (rating, bookingId, type) => {
    if (type === 'flight') {
      setFlightUserRating({ ...flightUserRating, [bookingId]: rating });
      // Send rating to the backend for flight booking
      axios.post('http://localhost:8000/api/v1/rateBooking', {
        bookingId,
        rating,
        type: 'flight',
      }).then(response => {
        console.log('Flight rating submitted successfully:', response.data);
      }).catch(error => {
        console.error('Error submitting flight rating:', error);
      });
    } else if (type === 'hotel') {
      setHotelUserRating({ ...hotelUserRating, [bookingId]: rating });
      // Send rating to the backend for hotel booking
      axios.post('http://localhost:8000/api/v1/rateBooking', {
        bookingId,
        rating,
        type: 'hotel',
      }).then(response => {
        console.log('Hotel rating submitted successfully:', response.data);
      }).catch(error => {
        console.error('Error submitting hotel rating:', error);
      });
    }
  };

  // Handle cancellation request
  const handleCancelation = async (bookingId, type) => {
    setModalVisible(true); // Show the modal while processing
    try {
      const response = await axios.post(type === 'flight'
        ? '/api/v1/cancelledFlightReservation'
        : 'http://localhost:8000/api/v1/cancelledHotelReservation', 
        { reservationId: bookingId });

      if (response.data.refundAmount) {
        setModalMessage(`Cancellation Request Accepted. Refund amount of $${response.data.refundAmount} will be refunded in the next 7 business days.`);
      } else {
        setModalMessage(`Cancellation Request Rejected. Reason: ${response.data.message || 'Unknown error.'}`);
      }
    } catch (error) {
      setModalMessage('Cancellation Request Rejected. Failed to cancel the booking. Please try again later.');
    }
  };

  // Handle modal close
  const handleModalClose = () => {
    setModalVisible(false); // Hide the modal after clicking "OK"
  };

  // Function to render booking cards (flight or hotel)
  const renderBookingCard = (booking, type) => {
    const isUpcoming = new Date(booking.date || booking.departure) > new Date();
    const bookingDate = new Date(booking.departure || booking.reservationDate).toLocaleString();
    const formattedDate = bookingDate === 'Invalid Date' ? 'N/A' : bookingDate;
    const bookingId = booking.id;

    const isFlight = type === 'flight';

    // Determine the hover and rating for the specific booking
    const currentRating = isFlight
      ? (flightHoveredRating[bookingId] !== undefined ? flightHoveredRating[bookingId] : flightUserRating[bookingId] || 0)
      : (hotelHoveredRating[bookingId] !== undefined ? hotelHoveredRating[bookingId] : hotelUserRating[bookingId] || 0);

    return (
      <MDBCard className="view-user-profile-comp-card" key={`${type}-${bookingId}`}>
        <MDBCardBody>
          <MDBCardTitle className="view-user-profile-comp-card-title">{type} Booking</MDBCardTitle>

          <MDBRow className="view-user-profile-comp-row">
            <MDBCol size="4">
              {isFlight ? (
                <>
                  <FaPlane className="view-user-profile-comp-icon-main" />
                  <strong>{booking.name}</strong> | From <strong>{booking.origin}</strong> to <strong>{booking.destination}</strong>
                </>
              ) : (
                <>
                  <FaHotel className="view-user-profile-comp-icon-main" />
                  <strong>{booking.hotelName}</strong> | Location: <strong>{booking.hotelLocation}</strong>
                </>
              )}
            </MDBCol>
            <MDBCol size="4" className="align-middle">
              <FaCalendarAlt className='view-user-profile-comp-icon-text-space' /> {isFlight ? 'Departure' : 'Reservation'}: {formattedDate}
            </MDBCol>
            <MDBCol size="2" className='align-middle'>
              {isFlight ? (
                <>
                  <FaUser className='view-user-profile-comp-icon-text-space'/> Seats: {booking.seats}
                </>
              ) : (
                <>
                  <FaRegCalendarCheck className='view-user-profile-comp-icon-text-space'/>  {booking.type} Room 
                </>
              )}
            </MDBCol>
            <MDBCol size="2" className="text-end view-user-profile-comp-bill-container">
              <FaDollarSign className='view-user-profile-comp-dollar-icon' /> <span className='view-user-profile-comp-margin-right'>{booking.bill}</span>
            </MDBCol>
          </MDBRow>

          <MDBRow className="view-user-profile-comp-row text-center">
            <MDBCol>
              {isUpcoming ? (
                <MDBBtn color="danger" size="sm" className='view-user-profile-comp-margin-above' onClick={() => handleCancelation(bookingId, type)}>
                  Cancel Reservation
                </MDBBtn>
              ) : (
                <div className="view-user-profile-comp-rating">
                  {renderStars(currentRating, bookingId, type).map((star, index) => (
                    <span
                      key={index}
                      className="view-user-profile-comp-star"
                      onMouseEnter={() => handleStarHover(index + 1, bookingId, type)}
                      onMouseLeave={() => handleStarHover(0, bookingId, type)}
                      onClick={() => handleStarClick(index + 1, bookingId, type)}
                    >
                      {star}
                    </span>
                  ))}
                </div>
              )}
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    );
  };

  return (
    <MDBContainer className="view-user-profile-comp-container">
      <section className="view-user-profile-comp-section">
        <h2 className="view-user-profile-comp-heading">Flight Bookings</h2>
        {flightBookings.length > 0 ? (
          flightBookings.map(booking => renderBookingCard(booking, 'flight'))
        ) : (
          <p>No flight bookings found.</p>
        )}
      </section>

      <section className="view-user-profile-comp-section">
        <h2 className="view-user-profile-comp-heading">Hotel Bookings</h2>
        {hotelBookings.length > 0 ? (
          hotelBookings.map(booking => renderBookingCard(booking, 'hotel'))
        ) : (
          <p>No hotel bookings found.</p>
        )}
      </section>

      {/* Modal for Cancellation Status */}
      <MDBModal show={modalVisible} onHide={handleModalClose}>
        <MDBModalBody>
          <p>{modalMessage}</p>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="primary" onClick={handleModalClose}>OK</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
}
