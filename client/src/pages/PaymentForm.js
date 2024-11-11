// import React, { useState } from 'react';
// import {
//   MDBBtn,
//   MDBCard,
//   MDBCardBody,
//   MDBCol,
//   MDBContainer,
//   MDBIcon,
//   MDBRadio,
//   MDBRow,
// } from 'mdb-react-ui-kit';
// import '../styles/PaymentForm.css';
// import { useLocation } from 'react-router-dom';

// export default function PaymentForm() {
//   const location = useLocation();
//   const [selectedCard, setSelectedCard] = useState('visa');
//   const { bookingType, amount, bookingDetails } = location.state; // Extract data from state

//   const handleCardSelection = (cardType) => {
//     setSelectedCard(cardType);
//   };

//   // Function to format booking details based on type
//   const formatBookingDetails = (type, details) => {
//     if (type === 'Hotel') {
//       return (
//         <>
//           <p>Hotel Name: {details.hotelName}</p>
//           <p>Location: {details.location}</p>
//           <p>Room Type: {details.roomType}</p>
//           <p>Number of Rooms: {details.numberOfRooms}</p>
//           <p>Duration: {details.duration} days</p>
//         </>
//       );
//     } 
//     // Add additional formatting logic for Flight and Package bookings if needed
//     return <p>{details}</p>; // Fallback for other types
//   };

//   return (
//     <MDBContainer fluid className="payment-form-container">
//       <MDBCard>
//         <MDBCardBody>
//           <MDBRow className="d-flex justify-content-center pb-5">
//             <MDBCol md="7" xl="5" className="mb-4 mb-md-0">
//               <h4 className="booking-type">{bookingType} Payment</h4>
//               <h4 className="text-success">${amount}</h4>
//               <h5>Booking Summary</h5>
//               {formatBookingDetails(bookingType, bookingDetails)}

//               <div className="d-flex flex-column pt-3">
//                 <p className="text-primary add-payment-option">
//                   <MDBIcon fas icon="plus-circle" className="text-primary pe-1" />
//                   Add payment card
//                 </p>

//                 {/* Payment Card Options */}
//                 <div className="payment-card-option">
//                   <MDBRadio
//                     name="radioCard"
//                     checked={selectedCard === 'visa'}
//                     onClick={() => handleCardSelection('visa')}
//                   />
//                   <div className="rounded border payment-card-details">
//                     <MDBIcon fab icon="cc-visa" size="lg" className="text-primary pe-2" />
//                     <span>Visa Debit Card</span>
//                     <span className="ms-auto">************3456</span>
//                   </div>
//                 </div>

//                 <div className="payment-card-option">
//                   <MDBRadio
//                     name="radioCard"
//                     checked={selectedCard === 'mastercard'}
//                     onClick={() => handleCardSelection('mastercard')}
//                   />
//                   <div className="rounded border payment-card-details">
//                     <MDBIcon fab icon="cc-mastercard" size="lg" className="text-dark pe-2" />
//                     <span>Mastercard Office</span>
//                     <span className="ms-auto">************1038</span>
//                   </div>
//                 </div>

//                 <MDBBtn block size="lg" className="proceed-payment-btn">
//                   Confirm Payment
//                 </MDBBtn>
//               </div>
//             </MDBCol>

//             <MDBCol md="5" xl="4" offsetXl="1">
//               <div className="cancel-link-container">
//                 <a href="#!">Cancel and return to website</a>
//               </div>

//               <div className="rounded order-recap">
//                 <h4>Order Recap</h4>
//                 <div className="recap-row">
//                   <MDBCol size="8">Booking Type</MDBCol>
//                   <div className="ms-auto">{bookingType}</div>
//                 </div>
//                 <div className="recap-row">
//                   <MDBCol size="8">Total Amount</MDBCol>
//                   <div className="ms-auto">${amount}</div>
//                 </div>
//               </div>
//             </MDBCol>
//           </MDBRow>
//         </MDBCardBody>
//       </MDBCard>
//     </MDBContainer>
//   );
// }



import React, { useState } from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRadio,
  MDBRow,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from 'mdb-react-ui-kit';
import '../styles/PaymentForm.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function PaymentForm() {
  const location = useLocation();
  const [selectedCard, setSelectedCard] = useState('visa');
  const { bookingType, amount, bookingDetails,userName } = location.state;
  const [modalOpen, setModalOpen] = useState(false);
  const [cardDetails, setCardDetails] = useState([]);
  const [newCard, setNewCard] = useState({ type: 'visa', number: '', expiryMM: '', expiryYYYY: '', cvv: '' });

  const handleCardSelection = (cardType) => {
    setSelectedCard(cardType);
  };

  const toggleModal = () => {
    setModalOpen((prevState) => !prevState);
  };

  const handleAddCard = () => {
    const { number, expiryMM, expiryYYYY, cvv } = newCard;

    // Validation checks
    const cardNumberValid = /^\d{16}$/.test(number);
    const expiryMMValid = /^\d{1,2}$/.test(expiryMM) && parseInt(expiryMM) >= 1 && parseInt(expiryMM) <= 12;
    const expiryYYYYValid = /^\d{4}$/.test(expiryYYYY);
    const cvvValid = /^\d{3,4}$/.test(cvv);

    if (cardNumberValid && expiryMMValid && expiryYYYYValid && cvvValid) {
      setCardDetails((prev) => [...prev, newCard]);
      setNewCard({ type: 'visa', number: '', expiryMM: '', expiryYYYY: '', cvv: '' }); // Reset form
      toggleModal();
    } else {
      alert("Please fill in valid card details.\n- Card Number: 16 digits\n- Expiry Date: MM (1-12) and YYYY\n- CVV: 3 or 4 digits");
    }
  };

  const handleRemoveCard = (index) => {
    setCardDetails((prev) => prev.filter((_, i) => i !== index));
    if (selectedCard === cardDetails[index].type) {
      setSelectedCard(cardDetails[0]?.type || 'visa'); // Reset selection if removed card was selected
    }
  };

  const formatBookingDetails = (type, details) => {
    if (type === 'Hotel') {
      return (
        <>
          <p><strong>Hotel Name:</strong> {details.hotelName}</p>
          <p><strong>Location:</strong> {details.location}</p>
          <p><strong>Room Type:</strong> {details.roomType}</p>
          <p><strong>Number of Rooms:</strong> {details.numberOfRooms}</p>
          <p><strong>Duration:</strong> {details.duration} days</p>
        </>
      );
    }
    else if(type === 'Flight') {
      return (
        <>
          <p><strong>Airline :</strong> {details.airlineName}</p>
          <p><strong>Flight From :</strong> {details.origin}</p>
          <p><strong>Flight To :</strong> {details.destination}</p>
          <p><strong>Departure Time :</strong> {details.departureTime}</p>
          <p><strong>Travellers :</strong> {details.travellers} </p>
        </>
      );
    }
    return <p>{details}</p>;
  };

  const makeReservations = async () => {
    const selectedCardDetails = cardDetails.find(card => card.type === selectedCard);
  
    if (!selectedCardDetails) {
      alert("Please select a card to confirm the payment.");
      return;
    }
  
    let reservationData;
    let apiEndpoint;
  
    if (bookingType === 'Hotel') {
      reservationData = {
        hotelId: bookingDetails.HotelId,
        userName: userName,
        reservationDate: bookingDetails.startDate,
        endDate: bookingDetails.endDate,
        noOfRooms: bookingDetails.numberOfRooms,
        type: bookingDetails.roomType,
      };
      apiEndpoint = 'http://localhost:8000/api/v1/hotelReservation/reserveHotelRoom';
    } else if (bookingType === 'Flight') {
      reservationData = {
        flightId: bookingDetails.flightId,
        userName: userName,
        seats:bookingDetails.travellers
      };
      apiEndpoint = 'http://localhost:8000/api/v1/flightReservation/reserveFlight';
    }
    console.log("reservation data :",reservationData)
    try {
      const response = await axios.post(apiEndpoint, reservationData);
      if (response.status === 200) {
        alert("Reservation confirmed!");
      }
    } catch (error) {
      console.error("Error making reservation:", error.response?.data?.error);
      alert("There was an error confirming your reservation. Please try again.");
    }
  };
  
  return (
    <MDBContainer fluid className="payment-form-container">
      <MDBCard>
        <MDBCardBody>
          <MDBRow className="d-flex justify-content-center pb-5">
            <MDBCol md="7" xl="5" className="mb-4 mb-md-0">
              <h4 className="booking-type">{bookingType} Payment</h4>
              <h4 className="text-success">${amount}</h4>
              <h5>Booking Summary</h5>
              {formatBookingDetails(bookingType, bookingDetails)}

              <div className="d-flex flex-column pt-3">
                <p className="text-primary add-payment-option" onClick={toggleModal}>
                  <MDBIcon fas icon="plus-circle" className="text-primary pe-1" />
                  Add payment card
                </p>

                {/* Display added cards */}
                {cardDetails.map((card, index) => (
                  <div key={index} className="payment-card-option">
                    <MDBRadio
                      name="radioCard"
                      checked={selectedCard === card.type}
                      onClick={() => handleCardSelection(card.type)}
                    />
                    <div className="rounded border payment-card-details">
                      <MDBIcon fab icon={`cc-${card.type}`} size="lg" className="text-dark pe-2" />
                      <span>{`${card.type.charAt(0).toUpperCase() + card.type.slice(1)} Card`}</span>
                      <span className="ms-auto">{`************${card.number.slice(-4)}`}</span>
                      <MDBBtn 
                        className="remove-card-btn"
                        onClick={() => handleRemoveCard(index)}
                      >
                        Remove
                      </MDBBtn>
                    </div>
                  </div>
                ))}

                <MDBBtn block size="lg" className="proceed-payment-btn" onClick={makeReservations}>
                  Confirm Payment
                </MDBBtn>
              </div>
            </MDBCol>

            <MDBCol md="5" xl="4">
              <div className="cancel-link-container">
                <a href="/hotels">Cancel and return to website</a>
              </div>

              <div className="rounded order-recap">
                <h4>Order Recap</h4>
                <div className="recap-row">
                  <MDBCol size="8">Booking Type</MDBCol>
                  <div className="ms-auto">{bookingType}</div>
                </div>
                <div className="recap-row">
                  <MDBCol size="8">Total Amount</MDBCol>
                  <div className="ms-auto">${amount}</div>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>

      {/* Modal for adding a new card */}
      {modalOpen && (
        <div className="custom-modal">
          <div className="modal-content">
            <MDBModalHeader toggle={toggleModal}>Add Payment Card</MDBModalHeader>
            <MDBModalBody>
              <MDBRadio
                name="cardType"
                id="visa"
                checked={newCard.type === 'visa'}
                onChange={() => setNewCard({ ...newCard, type: 'visa' })}
                label="Visa"
              />
              <MDBRadio
                name="cardType"
                id="mastercard"
                checked={newCard.type === 'mastercard'}
                onChange={() => setNewCard({ ...newCard, type: 'mastercard' })}
                label="Mastercard"
              />
              <MDBInput
                className='add-card-option-spacing'
                label="Card Number"
                type="text"
                value={newCard.number}
                onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
              />
              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    className='add-card-option-spacing'
                    label="Expiry MM"
                    type="text"
                    value={newCard.expiryMM}
                    onChange={(e) => setNewCard({ ...newCard, expiryMM: e.target.value })}
                    placeholder="MM"
                  />
                </MDBCol>
                <MDBCol md="6">
                  <MDBInput
                    className='add-card-option-spacing'
                    label="Expiry YYYY"
                    type="text"
                    value={newCard.expiryYYYY}
                    onChange={(e) => setNewCard({ ...newCard, expiryYYYY: e.target.value })}
                    placeholder="YYYY"
                  />
                </MDBCol>
              </MDBRow>
              <MDBInput
                className='add-card-option-spacing'
                label="CVV"
                type="text"
                value={newCard.cvv}
                onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
              />
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleModal}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleAddCard}>Add Card</MDBBtn>
            </MDBModalFooter>
          </div>
        </div>
      )}
    </MDBContainer>
  );
}

