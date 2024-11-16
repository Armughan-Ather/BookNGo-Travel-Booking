import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBBtn, MDBRow, MDBCol, MDBModalBody, MDBModalFooter,MDBModalHeader } from 'mdb-react-ui-kit';
import { FaPlane, FaCalendarAlt, FaUser, FaHotel, FaDollarSign, FaRegCalendarCheck} from 'react-icons/fa';
import { RiStarSFill, RiStarHalfSFill, RiStarLine } from 'react-icons/ri'; 
import '../styles/profilePage.css';
import { AuthContext } from '../Context/AuthContext';

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const username = user?.username;

  const [hotelBookings, setHotelBookings] = useState([]);
  const [flightBookings, setFlightBookings] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 

  // State to handle ratings
  const [flightUserRating, setFlightUserRating] = useState({});
  const [hotelUserRating, setHotelUserRating] = useState({});
  const [flightHoveredRating, setFlightHoveredRating] = useState({});
  const [hotelHoveredRating, setHotelHoveredRating] = useState({});
  const [temp,setTemp]=useState(false);
  useEffect(() => {
    const fetchBookingHistory = async () => {
      if (username) {
        try {
          const hotelResponse = await axios.post('http://localhost:8000/api/v1/users/getUserHotelReservationHistory', { username });
          setHotelBookings(hotelResponse.data.hotelReservations || []);
          
          const flightResponse = await axios.post('http://localhost:8000/api/v1/users/getUserFlightReservationHistory', { username });
          setFlightBookings(flightResponse.data.flightReservations || []);
        } catch (error) {
          console.error('Error fetching bookings:', error);
        }
      }
    };

    fetchBookingHistory();
  }, [temp]);

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
  const handleStarClick = async (rating, bookingId, type, id) => {
    try {
      if (type === 'flight') {
        setFlightUserRating(prev => ({ ...prev, [bookingId]: rating }));

        
        const response = await axios.post('http://localhost:8000/api/v1/airlines/updateAirlineRating', {
          airlineId: id,
          rating,
        });
      } else if (type === 'hotel') {
        setHotelUserRating(prev => ({ ...prev, [bookingId]: rating }));

        const response = await axios.post('http://localhost:8000/api/v1/hotels/updateHotelRating', {
          hotelId: id,
          rating,
        });
      }
      setModalMessage('Ratings updated successfully. Thanks for your review.');
      setModalVisible(true);
      setTemp((prev)=>!prev);
    } catch (error) {
      setModalMessage('Failed to submit your rating. Please try again later.');
      setModalVisible(true);
    }
  };

  const handleCancelation = async (bookingId, type) => {
    try {
        
      const response = await axios.post(type === 'flight'
        ? 'http://localhost:8000/api/v1/cancelledFlightReservation/cancelFlightReservation'
        : 'http://localhost:8000/api/v1/cancelledHotelReservation/cancelHotelReservation',
        { reservationId: bookingId });

      if (response.data.data) {
        setModalVisible(true); 
    
        setModalMessage(`Cancellation Request Accepted. Refund amount of $${response.data.data} will be refunded in the next 7 business days.`);
      }
      console.log('checking refund amt :',response.data) 
      setTemp((prev)=>!prev);
    } catch (error) {
        console.log('cancelation error : ',error)
        setModalVisible(true); 
    
        setModalMessage(`Cancellation Request Rejected.${error?.response.data.error || 'Unknown error.'}`);
        
    }
  };
  
  const handleModalClose = () => {
    setModalVisible(false);
    setModalMessage('')
};

  const renderBookingCard = (booking, type) => {
    if(booking.reservationStatus==='Cancelled'){
        return null;
    }
    //const bookingDate = new Date(booking.flightDepartureTime || booking.reservationStartDate).toLocaleString();
    const bookingDate = booking.flightDepartureTime || booking.reservationStartDate;
    
    const formattedDate = bookingDate === 'Invalid Date' ? 'N/A' : bookingDate;
    const bookingId = booking.reservationId;
    
    const isFlight = type === 'flight';

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
                  <strong>{booking.airlineName}</strong> | From <strong>{booking.flightOrigin}</strong> to <strong>{booking.flightDestination}</strong>
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
                  <FaUser className='view-user-profile-comp-icon-text-space'/> Seats: {booking.reservedSeats}
                </>
              ) : (
                <>
                  <FaRegCalendarCheck className='view-user-profile-comp-icon-text-space'/>  {booking.reservationRooms + ' '+ booking.reservationType} Room 
                </>
              )}
            </MDBCol>
            <MDBCol size="2" className="text-end view-user-profile-comp-bill-container">
              <FaDollarSign className='view-user-profile-comp-dollar-icon' /> <span className='view-user-profile-comp-margin-right'>{booking.reservationBill}</span>
            </MDBCol>
          </MDBRow>

          <MDBRow className="view-user-profile-comp-row text-center">
            <MDBCol>
              {booking.reservationStatus==='Booked' && (
                <MDBBtn color="danger" size="sm" className='view-user-profile-comp-margin-above' onClick={() => handleCancelation(bookingId, type)}>
                  Cancel Reservation
                </MDBBtn>
              )}  
              {booking.reservationStatus==='Availed' && (
                <div className="view-user-profile-comp-rating">
                  {renderStars(currentRating, bookingId, type).map((star, index) => (
                    <span
                      key={index}
                      className="view-user-profile-comp-star"
                      onMouseEnter={() => handleStarHover(index + 1, bookingId, type)}
                      onMouseLeave={() => handleStarHover(0, bookingId, type)}
                      onClick={type === 'flight'
                        ? () => handleStarClick(index + 1, bookingId, type, booking.airlineId)
                        : () => handleStarClick(index + 1, bookingId, type, booking.hotelId)
                      }
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

      {modalVisible && (
        <div className="view-user-profile-comp-modal">
          <div className="modal-content">
            <MDBModalHeader toggle={handleModalClose}><strong>Confirmation</strong></MDBModalHeader>
            <MDBModalBody>
              <p>{modalMessage}</p>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="primary" onClick={handleModalClose}>OK</MDBBtn>
            </MDBModalFooter>
          </div>
        </div>
      )}
    </MDBContainer>
  );
}
