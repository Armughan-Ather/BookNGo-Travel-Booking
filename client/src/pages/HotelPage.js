// import React, { useState, useEffect } from 'react';
// import { FaSearch, FaMapMarkerAlt, FaBed, FaCalendarAlt, FaTimes } from 'react-icons/fa';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import '../styles/HotelPage.css';

// const CustomInput = React.forwardRef(({ onClick, value, onClear }, ref) => (
//     <div className="input-container" ref={ref}>
//         <FaCalendarAlt className="input-icon" onClick={onClick} />
//         <input
//             type="text"
//             className="date-input"
//             placeholder={value || "Select Date"}
//             value={value}
//             readOnly
//             onClick={onClick}
//         />
//         {value && (
//             <FaTimes className="clear-icon" onClick={onClear} />
//         )}
//     </div>
// ));

// export default function HotelPage() {
//     const [hotels, setHotels] = useState([]);
//     const [filteredHotels, setFilteredHotels] = useState([]);
//     const [searchInput, setSearchInput] = useState('');
//     const [rooms, setRooms] = useState(''); // Initialize as an empty string
//     const [checkInDate, setCheckInDate] = useState(null);
//     const [checkOutDate, setCheckOutDate] = useState(null);

//     useEffect(() => {
//         const hotelData = [
//             { id: 1, name: "Hotel Sunrise", location: "New York", price: "$200", image: "/images/hotel1.jpg" },
//             { id: 2, name: "Mountain View Hotel", location: "Denver", price: "$180", image: "/images/hotel2.jpg" },
//             { id: 3, name: "Beach Resort", location: "Miami", price: "$250", image: "/images/hotel3.jpg" },
//             { id: 4, name: "City Central Inn", location: "Chicago", price: "$150", image: "/images/hotel4.jpg" }
//         ];

//         setHotels(hotelData);
//         setFilteredHotels(hotelData);
//     }, []);

//     function handleSearch(event) {
//         setSearchInput(event.target.value);
//         const searchResult = hotels.filter(hotel => 
//             hotel.name.toLowerCase().includes(event.target.value.toLowerCase())
//         );
//         setFilteredHotels(searchResult);
//     }

//     function handleBook(hotelName) {
//         alert(`You have booked ${hotelName}`);
//     }

//     // Clear check-in and check-out dates
//     const clearCheckInDate = () => setCheckInDate(null);
//     const clearCheckOutDate = () => setCheckOutDate(null);

//     // Validate and set rooms value
//     const handleRoomsChange = (e) => {
//         const value = e.target.value;

//         // Ensure the value is not negative or a decimal, and allow empty input
//         if (value === '' || (Number.isInteger(+value) && +value >= 0)) {
//             setRooms(value);
//         }
//     };

//     return (
//         <div className="hotel-page">
//             <h1>Find Your Perfect Hotel</h1>

//             <div className="search-container">
//                 <div className="input-container">
//                     <FaMapMarkerAlt className="input-icon" />
//                     <input
//                         type="text"
//                         placeholder="City"
//                         value={searchInput}
//                         onChange={handleSearch}
//                     />
//                 </div>
//                 <DatePicker
//                     selected={checkInDate}
//                     onChange={(date) => setCheckInDate(date)}
//                     placeholderText="Check-In Date"
//                     dateFormat="MM/dd/yyyy"
//                     customInput={<CustomInput onClear={clearCheckInDate} />}
//                 />
//                 <DatePicker
//                     selected={checkOutDate}
//                     onChange={(date) => setCheckOutDate(date)}
//                     placeholderText="Check-Out Date"
//                     dateFormat="MM/dd/yyyy"
//                     customInput={<CustomInput onClear={clearCheckOutDate} />}
//                 />
//                 <div className="input-container">
//                     <FaBed className="input-icon" />
//                     <input
//                         type="number"
//                         placeholder="Rooms"
//                         className="rooms-input"
//                         value={rooms}
//                         onChange={handleRoomsChange}
//                     />
//                 </div>
//                 <button className="search-button">
//                     <FaSearch />
//                 </button>
//             </div>

//             <div className="hotel-slider">
//                 {filteredHotels.map(hotel => (
//                     <div className="hotel-card" key={hotel.id}>
//                         <img src={hotel.image} alt={hotel.name} />
//                         <h3>{hotel.name}</h3>
//                         <p>{hotel.location}</p>
//                         <p>{hotel.price} per night</p>
//                         <button onClick={() => handleBook(hotel.name)}>Book Now</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }


import React, { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaBed, FaCalendarAlt, FaTimes } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/HotelPage.css';
import { MdOutlineAddLocation } from "react-icons/md";
import cities from 'cities.json'; // Import the cities.json dataset

const CustomInput = React.forwardRef(({ onClick, value, onClear }, ref) => (
    <div className="input-container" ref={ref}>
        <FaCalendarAlt className="input-icon" onClick={onClick} />
        <input
            type="text"
            className="date-input"
            placeholder={value || "Select Date"}
            value={value}
            readOnly
            onClick={onClick}
        />
        {value && (
            <FaTimes className="clear-icon" onClick={onClear} />
        )}
    </div>
));

export default function HotelPage() {
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [rooms, setRooms] = useState('');
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [suggestions, setSuggestions] = useState([]); 
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        const hotelData = [
            { id: 1, name: "Hotel Sunrise", location: "New York", price: "$200", image: "/images/hotel1.jpg" },
            { id: 2, name: "Mountain View Hotel", location: "Denver", price: "$180", image: "/images/hotel2.jpg" },
            { id: 3, name: "Beach Resort", location: "Miami", price: "$250", image: "/images/hotel3.jpg" },
            { id: 4, name: "City Central Inn", location: "Chicago", price: "$150", image: "/images/hotel4.jpg" }
        ];

        setHotels(hotelData);
        setFilteredHotels(hotelData);
    }, []);

    function handleSearchInput(event) {
        const input = event.target.value;
        setSearchInput(input);

        if (input.length > 0) {
            // Filter cities from the imported cities.json dataset
            const filteredSuggestions = cities.filter(city =>
                city.name.toLowerCase().includes(input.toLowerCase())
            ).map(city => city.name); // Get only the city names

            setSuggestions(filteredSuggestions);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }

    function handleCitySelect(city) {
        setSearchInput(city);
        setShowSuggestions(false);
    }

    function handleRoomsChange(e) {
        const value = e.target.value;
        if (value === '' || (Number.isInteger(+value) && +value >= 0)) {
            setRooms(value);
        }
    }

    function handleBook(hotelName) {
        alert(`You have booked ${hotelName}`);
    }

    return (
        <div className="hotel-page">
            <h1>Find Your Perfect Hotel</h1>

            <div className="search-container">
                <div className="input-container">
                    <FaMapMarkerAlt className="input-icon" />
                    <input
                        type="text"
                        className='inputDropdown'
                        placeholder="City"
                        value={searchInput}
                        onChange={handleSearchInput}
                        onFocus={() => setShowSuggestions(true)}
                    />
                    {showSuggestions && (
                        <ul className="suggestions-dropdown">
                            {suggestions.map((city, index) => (
                                <li key={index} onClick={() => handleCitySelect(city)}>
                                    <MdOutlineAddLocation className="dropdown-icon" /> {city}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <DatePicker
                    selected={checkInDate}
                    onChange={(date) => setCheckInDate(date)}
                    placeholderText="Check-In Date"
                    dateFormat="MM/dd/yyyy"
                    customInput={<CustomInput onClear={() => setCheckInDate(null)} />}
                />
                <DatePicker
                    selected={checkOutDate}
                    onChange={(date) => setCheckOutDate(date)}
                    placeholderText="Check-Out Date"
                    dateFormat="MM/dd/yyyy"
                    customInput={<CustomInput onClear={() => setCheckOutDate(null)} />}
                />
                <div className="input-container">
                    <FaBed className="input-icon" />
                    <input
                        type="number"
                        placeholder="Rooms"
                        className="rooms-input"
                        value={rooms}
                        onChange={handleRoomsChange}
                    />
                </div>
                <button className="search-button">
                    <FaSearch />
                </button>
            </div>

            <div className="hotel-slider">
                {filteredHotels.map(hotel => (
                    <div className="hotel-card" key={hotel.id}>
                        <img src={hotel.image} alt={hotel.name} />
                        <h3>{hotel.name}</h3>
                        <p>{hotel.location}</p>
                        <p>{hotel.price} per night</p>
                        <button onClick={() => handleBook(hotel.name)}>Book Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
