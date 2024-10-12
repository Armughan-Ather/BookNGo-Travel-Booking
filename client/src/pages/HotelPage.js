import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaMapMarkerAlt, FaBed, FaCalendarAlt, FaTimes } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/HotelPage.css';
import { MdOutlineAddLocation } from "react-icons/md";
import cities from 'cities.json'; // Import the cities.json dataset
import axios from "axios"; // Import axios for API requests

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
    const [hotels, setHotels] = useState([]); // Initially empty array for hotels
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);

    const [searchData, setSearchData] = useState({
        HotelOrCity: '',
        checkInDate: null,
        checkOutDate: null,
        rooms: '',
        roomType: 'standard'
    });

    const indexedCities = {};

    cities.forEach(city => {
        const firstLetter = city.name[0].toLowerCase();
        if (!indexedCities[firstLetter]) {
            indexedCities[firstLetter] = [];
        }
        indexedCities[firstLetter].push(city.name);
    });

    // Fetch hotel names from backend when the page loads
    useEffect(() => {
        async function fetchHotels() {
            try {
                const response = await axios.get('/api/hotels'); // Replace with your actual API endpoint
                setHotels(response.data.hotels); // Assuming the response has the hotel data in 'hotels' key
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        }

        fetchHotels(); // Call the fetch function on component mount
    }, []); // Empty dependency array to run only on mount

    function handleCityOrHotelSelect(name) {
        setSearchData(prevState => ({
            ...prevState,
            HotelOrCity: name
        }));
        setShowSuggestions(false);
    }

    function handleChange(event) {
        const { name, value } = event.target;

        if ((name === "rooms" && (value === '' || (Number.isInteger(+value) && +value >= 0))) || name !== "rooms") {
            setSearchData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }

        if (name === "HotelOrCity") {
            const input = event.target.value.toLowerCase();
            const firstLetter = input[0];

            if (input.length > 0) {
                const citySuggestions = indexedCities[firstLetter]?.filter(city =>
                    city.toLowerCase().includes(input)
                ) || [];

                const hotelSuggestions = hotels.filter(hotel =>
                    hotel.toLowerCase().includes(input)
                ).slice(0, 4); // Limit to 4 suggestions

                const combinedSuggestions = [...hotelSuggestions, ...citySuggestions].slice(0, 4);
                setSuggestions(combinedSuggestions);
                setShowSuggestions(true);
            } else {
                setShowSuggestions(false);
            }
        }
    }

    function handleDateChange(date,name) {
        if(name==="CheckInDate"){
            setSearchData(prevState => ({
                ...prevState,
                checkInDate: date
            }));
        }
        else{
            setSearchData(prevState => ({
                ...prevState,
                checkOutDate: date
            }));    
        }
        
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

    async function handleHotelSearch() {
        try{
            if(searchData.HotelOrCity===""){
                return
            }
            const response = await axios.post("http://localhost:8000/api/v1/hotels/search", {
                HotelOrCity: searchData.HotelOrCity,
                checkInDate: searchData.checkInDate,
                checkOutDate:searchData.checkOutDate,
                rooms:searchData.rooms,
                roomType:searchData.roomType
            });

        }
        catch (error) {
            console.error('Error searching hotels:', error);
        }
    }

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
                            value={searchData.HotelOrCity}
                            name='HotelOrCity'
                            onChange={handleChange}
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
                        selected={searchData.checkInDate}
                        onChange={(date)=>handleDateChange(date,"CheckInDate")}
                        placeholderText="Check-In Date"
                        dateFormat="dd/MM/yyyy"
                        customInput={<CustomInput onClear={() => handleDateChange(null,"CheckInDate")} />}
                    />

                    <DatePicker
                        selected={searchData.checkOutDate}
                        onChange={(date)=>handleDateChange(date,"CheckOutDate")}
                        placeholderText="Check-Out Date"
                        dateFormat="dd/MM/yyyy"
                        customInput={<CustomInput onClear={() => handleDateChange(null,"CheckOutDate")} />}
                        name="checkOutDate"
                    />

                    <div className="input-container">
                        <FaBed className="input-icon room-icon" />
                        <input
                            type="number"
                            placeholder="Rooms"
                            className="rooms-input"
                            value={searchData.rooms}
                            name="rooms"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-container room-type-container">
                        <select value={searchData.roomType} onChange={handleChange} name="roomType" className="room-type-dropdown">
                            <option value="standard">Standard</option>
                            <option value="deluxe">Deluxe</option>
                        </select>
                    </div>

                    <button className="search-button" onClick={handleHotelSearch}>
                        <FaSearch />
                    </button>
                </div>
            </div>
        </div>
    );
}
