import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaBed, FaTimes } from 'react-icons/fa';
import '../styles/hotelReservationPage.css';
import { useAuth } from '../Context/AuthContext'; // Import the useAuth hook
import { useLocation, useNavigate } from 'react-router-dom';

const CustomInput = React.forwardRef(({ onClick, value, onClear, placeholder }, ref) => (
    <div className="hotel-reservation-input-container" ref={ref}>
        <FaCalendarAlt className="hotel-reservation-input-icon hotel-reservation-date-icon" onClick={onClick} />
        <input
            type="text"
            className="hotel-reservation-date-input"
            placeholder={value || placeholder}
            value={value}
            readOnly
            onClick={onClick}
        />
        {value && (
            <FaTimes className="hotel-reservation-clear-icon" onClick={onClear} />
        )}
    </div>
));

export default function HotelReservationPage() {
    const { user } = useAuth(); // Access user from auth context
    const location = useLocation();
    const navigate = useNavigate(); // useNavigate to redirect to payment page
    const hotelDetails = location.state;

    const [reservationData, setReservationData] = useState({
        startDate: null,
        endDate: null,
        numberOfRooms: 1,
        totalPrice: 0,
    });

    function handleDateChange(date, name) {
        setReservationData(prevState => ({
            ...prevState,
            [name]: date
        }));
        
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setReservationData(prevState => ({
            ...prevState,
            [name]: value
        }));
        
    }

    function calculateTotalPrice() {
        if (reservationData.startDate && reservationData.endDate) {
            const timeDiff = Math.abs(reservationData.endDate - reservationData.startDate);
            const dayCount = Math.ceil(timeDiff / (1000 * 3600 * 24));
            const pricePerNight =  hotelDetails.price;
            console.log("price per night : ",pricePerNight)
            const totalPrice = pricePerNight * dayCount * reservationData.numberOfRooms;
            setReservationData(prevState => ({
                ...prevState,
                totalPrice: totalPrice
            }));
        }
        else if(reservationData.startDate===null || reservationData.endDate===null || reservationData.numberOfRooms===0){
            setReservationData(prevState => ({
                ...prevState,
                totalPrice: 0
            }));
        }
    }

    React.useEffect(() => {
        calculateTotalPrice();
    }, [reservationData.startDate, reservationData.endDate, reservationData.numberOfRooms]);

    function handleReservation() {
        const duration = Math.ceil(Math.abs(reservationData.endDate - reservationData.startDate) / (1000 * 3600 * 24));
    
        const bookingData = {
            bookingType: 'Hotel',
            amount: reservationData.totalPrice,
            bookingDetails: {
                hotelName: hotelDetails.hotelName,
                location: hotelDetails.location,
                roomType: hotelDetails.roomType,
                numberOfRooms: reservationData.numberOfRooms,
                duration: duration,
                startDate:reservationData.startDate,
                endDate:reservationData.endDate
            },
            userName:user?.username
        };
    
        navigate('/payment', { state: bookingData });
    }

    return (
        <div className="hotel-reservation-reservation-page-container">
            <h1 className="hotel-reservation-reservation-title">Reservation Details</h1>
            <div className="hotel-reservation-reservation-details">
                <div className="hotel-reservation-reservation-form">
                    <div className="hotel-reservation-details-column">
                        <div className="hotel-reservation-detail">
                            <label>Signed In As</label>
                            <input
                                type="text"
                                value={user?.username || ""}
                                readOnly
                                className="hotel-reservation-input-field hotel-reservation-input-field-view-only"
                            />
                        </div>
                        <div className="hotel-reservation-detail">
                            <label>Hotel Name</label>
                            <input
                                type="text"
                                value={hotelDetails?.hotelName || ""}
                                readOnly
                                className="hotel-reservation-input-field hotel-reservation-input-field-view-only"
                            />
                        </div>
                        <div className="hotel-reservation-detail">
                            <label>Location</label>
                            <input
                                type="text"
                                value={hotelDetails?.location || ""}
                                readOnly
                                className="hotel-reservation-input-field hotel-reservation-input-field-view-only"
                            />
                        </div>
                        <div className="hotel-reservation-detail">
                            <label>Room Type</label>
                            <input
                                type="text"
                                value={hotelDetails?.roomType || ""}
                                readOnly
                                className="hotel-reservation-input-field hotel-reservation-input-field-view-only"
                            />
                        </div>
                        <div className="hotel-reservation-detail">
                            <label className='date-reservations-label-hotel-reservations'>Reservation Start Date</label>
                            <DatePicker
                                selected={reservationData.startDate}
                                onChange={(date) => handleDateChange(date, "startDate")}
                                placeholderText="Select Start Date"
                                customInput={<CustomInput onClear={() => handleDateChange(null, "startDate")} />}
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>
                        <div className="hotel-reservation-detail">
                            <label className='date-reservations-label-hotel-reservationsv2'>Reservation End Date</label>
                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={reservationData.endDate}
                                onChange={(date) => handleDateChange(date, "endDate")}
                                placeholderText="Select End Date"
                                customInput={<CustomInput onClear={() => handleDateChange(null, "endDate")} />}
                            />
                        </div>
                        <div className="hotel-reservation-detail">
                            <label>Number of Rooms</label>
                            <input
                                type="number"
                                name="numberOfRooms"
                                value={reservationData.numberOfRooms}
                                onChange={handleChange}
                                className="hotel-reservation-input-field"
                            />
                        </div>
                        <div className="hotel-reservation-detail">
                            <label>Total Price</label>
                            <input
                                type="text"
                                value={reservationData.totalPrice}
                                readOnly
                                className="hotel-reservation-input-field hotel-reservation-input-field-view-only"
                            />
                        </div>
                        <button className="hotel-reservation-confirm-button" onClick={handleReservation}>
                            Proceed To Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
