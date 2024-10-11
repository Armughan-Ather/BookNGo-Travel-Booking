// import React, { useState, useEffect, useRef } from 'react';
// import { FaSearch, FaMapMarkerAlt, FaBed, FaCalendarAlt, FaTimes } from 'react-icons/fa';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import '../styles/HotelPage.css';
// import { MdOutlineAddLocation } from "react-icons/md";
// import cities from 'cities.json'; // Import the cities.json dataset

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
//     const [rooms, setRooms] = useState('');
//     const [checkInDate, setCheckInDate] = useState(null);
//     const [checkOutDate, setCheckOutDate] = useState(null);
//     const [suggestions, setSuggestions] = useState([]); 
//     const [showSuggestions, setShowSuggestions] = useState(false);
//     const inputRef = useRef(null); // Create a ref to track the input container
//     const indexedCities = {}; // Preprocess the cities by first letter

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
    
//     cities.forEach(city => {
//         const firstLetter = city.name[0].toLowerCase();
//         if (!indexedCities[firstLetter]) {
//             indexedCities[firstLetter] = [];
//         }
//         indexedCities[firstLetter].push(city.name);
//     });

//     function handleSearchInput(event) {
//         const input = event.target.value.toLowerCase();
//         setSearchInput(input);
//         const firstLetter = input[0];

//         if (input.length > 0 && indexedCities[firstLetter]) {
//             const filteredSuggestions = indexedCities[firstLetter].filter(city =>
//                 city.toLowerCase().includes(input)
//             ).slice(0, 4); // Get only top 4 suggestions
//             setSuggestions(filteredSuggestions);
//             setShowSuggestions(true);
//         } else {
//             setShowSuggestions(false);
//         }
//     }

//     function handleCitySelect(city) {
//         setSearchInput(city);
//         setShowSuggestions(false);
//     }

//     function handleRoomsChange(e) {
//         const value = e.target.value;
//         if (value === '' || (Number.isInteger(+value) && +value >= 0)) {
//             setRooms(value);
//         }
//     }

//     function handleBook(hotelName) {
//         alert(`You have booked ${hotelName}`);
//     }

//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (inputRef.current && !inputRef.current.contains(event.target)) {
//                 setShowSuggestions(false);
//             }
//         }

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [inputRef]);

//     return (
//         <div className="hotel-page">
//             <h1>Find Your Perfect Hotel</h1>

//             <div className="search-container">
//                 <div className="input-container" ref={inputRef}>
//                     <FaMapMarkerAlt className="input-icon" />
//                     <input
//                         type="text"
//                         className='inputDropdown'
//                         placeholder="City"
//                         value={searchInput}
//                         onChange={handleSearchInput}
//                         onFocus={() => setShowSuggestions(true)}
//                     />
//                     {showSuggestions && (
//                         <ul className="suggestions-dropdown">
//                             {suggestions.map((city, index) => (
//                                 <li key={index} onClick={() => handleCitySelect(city)}>
//                                     <MdOutlineAddLocation className="dropdown-icon" /> {city}
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//                 <DatePicker
//                     selected={checkInDate}
//                     onChange={(date) => setCheckInDate(date)}
//                     placeholderText="Check-In Date"
                    
//                     dateFormat="MM/dd/yyyy"
//                     customInput={<CustomInput onClear={() => setCheckInDate(null)} />}
//                 />
//                 <DatePicker
//                     selected={checkOutDate}
//                     onChange={(date) => setCheckOutDate(date)}
//                     placeholderText="Check-Out Date"
//                     dateFormat="MM/dd/yyyy"
//                     customInput={<CustomInput onClear={() => setCheckOutDate(null)} />}
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



import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaMapMarkerAlt, FaBed, FaCalendarAlt, FaTimes, FaCaretDown } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/HotelPage.css';
import { MdOutlineAddLocation } from "react-icons/md";
import cities from 'cities.json'; // Import the cities.json dataset

// Custom Date Picker Input
const CustomInput = React.forwardRef(({ onClick, value, onClear, placeholder }, ref) => (
    <div className="input-container" ref={ref}>
        <FaCalendarAlt className="input-icon date-icon" onClick={onClick} />
        <input
            type="text"
            className="date-input"
            placeholder={value || placeholder}
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
    const [hotels, setHotels] = useState(["Agha Khan Hotel", "PC Hotel"]);
    const [searchInput, setSearchInput] = useState('');
    const [rooms, setRooms] = useState('');
    const [roomType, setRoomType] = useState('standard');
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);

    const indexedCities = {};

    cities.forEach(city => {
        const firstLetter = city.name[0].toLowerCase();
        if (!indexedCities[firstLetter]) {
            indexedCities[firstLetter] = [];
        }
        indexedCities[firstLetter].push(city.name);
    });

    function handleSearchInput(event) {
        const input = event.target.value.toLowerCase();
        setSearchInput(input);
        const firstLetter = input[0];

        if (input.length > 0) {
            const citySuggestions = indexedCities[firstLetter]?.filter(city =>
                city.toLowerCase().includes(input)
            ) || [];

            const hotelSuggestions = hotels.filter(hotel =>
                hotel.toLowerCase().includes(input)
            ).map(hotel => hotel);

            const combinedSuggestions = [...citySuggestions, ...hotelSuggestions].slice(0, 4);
            setSuggestions(combinedSuggestions);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }

    function handleCityOrHotelSelect(name) {
        setSearchInput(name);
        setShowSuggestions(false);
    }

    function handleRoomsChange(e) {
        const value = e.target.value;
        if (value === '' || (Number.isInteger(+value) && +value >= 0)) {
            setRooms(value);
        }
    }

    function handleRoomTypeChange(e) {
        setRoomType(e.target.value);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [inputRef]);

    return (
        <div className="hotel-page">
            <div className="hero-section">
                <h1 className="hero-heading heroTagline">Discover Your Ideal Stay</h1>
                <div className="search-container">
                    <div className="input-container citySearch" ref={inputRef}>
                        <FaMapMarkerAlt className="input-icon city-icon" />
                        <input
                            type="text"
                            className='inputDropdown'
                            placeholder="City or Hotel"
                            value={searchInput}
                            onChange={handleSearchInput}
                            onFocus={() => setShowSuggestions(true)}
                        />
                        {showSuggestions && (
                            <ul className="suggestions-dropdown">
                                {suggestions.map((name, index) => (
                                    <li key={index} onClick={() => handleCityOrHotelSelect(name)}>
                                        <MdOutlineAddLocation className="dropdown-icon" /> {name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="search-container">
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
                        <FaBed className="input-icon room-icon" />
                        <input
                            type="number"
                            placeholder="Rooms"
                            className="rooms-input"
                            value={rooms}
                            onChange={handleRoomsChange}
                        />
                    </div>

                    <div className="input-container room-type-container">
                        <select value={roomType} onChange={handleRoomTypeChange} className="room-type-dropdown">
                            <option value="standard">Standard</option>
                            <option value="deluxe">Deluxe</option>
                            
                        </select>
                        {/* <FaCaretDown className="dropdown-icon" /> */}
                    </div>

                    <button className="search-button">
                        <FaSearch />
                    </button>
                </div>
            </div>
        </div>
    );
}
