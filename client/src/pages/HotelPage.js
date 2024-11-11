// import React, { useState, useEffect, useRef } from 'react';
// import { FaSearch, FaMapMarkerAlt, FaBed, FaCalendarAlt, FaTimes } from 'react-icons/fa';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import '../styles/HotelPage.css';
// import { MdOutlineAddLocation } from "react-icons/md";
// import cities from 'cities.json';
// import axios from "axios";
// import HotelCard from '../components/hotelSearchResultsCard'; // Import HotelCard component

// // Custom Date Picker Input
// const CustomInput = React.forwardRef(({ onClick, value, onClear, placeholder }, ref) => (
//     <div className="input-container" ref={ref}>
//         <FaCalendarAlt className="input-icon date-icon" onClick={onClick} />
//         <input
//             type="text"
//             className="date-input"
//             placeholder={value || placeholder}
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
//     const [hotels, setHotels] = useState([]); // For hotel names
//     const [searchResults, setSearchResults] = useState([]); // For storing search results
//     const [suggestions, setSuggestions] = useState([]);
//     const [showSuggestions, setShowSuggestions] = useState(false);
//     const inputRef = useRef(null);

//     const [searchData, setSearchData] = useState({
//         HotelOrCity: '',
//         checkInDate: null,
//         checkOutDate: null,
//         rooms: '',
//         roomType: 'standard'
//     });

//     const indexedCities = {};
//     cities.forEach(city => {
//         const firstLetter = city.name[0].toLowerCase();
//         if (!indexedCities[firstLetter]) {
//             indexedCities[firstLetter] = [];
//         }
//         indexedCities[firstLetter].push(city.name);
//     });

//     // Fetch hotel names from backend when the page loads
//     useEffect(() => {
//         async function fetchHotels() {
//             try {
//                 const response = await axios.get('http://localhost:8000/api/v1/hotels/allHotels');
//                 const hotelNames = response.data.data.map(hotel => hotel.name);
//                 setHotels(hotelNames);
//             } catch (error) {
//                 //console.log()
//                 //console.error('Error fetching hotels!!:', error.response?.data?.error);
//                 console.log("error fetching Hotels : ",error)
//             }
//         }

//         fetchHotels();
//     }, []);

//     function handleCityOrHotelSelect(name) {
//         setSearchData(prevState => ({
//             ...prevState,
//             HotelOrCity: name
//         }));
//         setShowSuggestions(false);
//     }

//     function handleChange(event) {
//         const { name, value } = event.target;

//         if ((name === "rooms" && (value === '' || (Number.isInteger(+value) && +value >= 0))) || name !== "rooms") {
//             setSearchData(prevState => ({
//                 ...prevState,
//                 [name]: value
//             }));
//         }

//         if (name === "HotelOrCity") {
//             const input = event.target.value.toLowerCase();
//             const firstLetter = input[0];

//             if (input.length > 0) {
//                 const citySuggestions = indexedCities[firstLetter]?.filter(city =>
//                     city.toLowerCase().includes(input)
//                 ) || [];

//                 const hotelSuggestions = hotels.filter(hotel =>
//                     hotel.toLowerCase().includes(input)
//                 ).slice(0, 4);

//                 const combinedSuggestions = [...hotelSuggestions, ...citySuggestions].slice(0, 4);
//                 setSuggestions(combinedSuggestions);
//                 setShowSuggestions(true);
//             } else {
//                 setShowSuggestions(false);
//             }
//         }
//     }

//     function handleDateChange(date, name) {
//         setSearchData(prevState => ({
//             ...prevState,
//             [name === "CheckInDate" ? 'checkInDate' : 'checkOutDate']: date
//         }));
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

//     async function handleHotelSearch() {
//         try {
//             if (searchData.HotelOrCity === "") {
//                 return;
//             }
//             const response = await axios.post('http://localhost:8000/api/v1/hotels/searchHotels', {
//                 hotelNameOrCity: searchData.HotelOrCity,
//                 roomType: searchData.roomType,
//                 numberOfRooms: searchData.rooms
//             });
//             console.log("Search response:", response.data.data);
//             setSearchResults(response.data.data); // Set the search results from API response
//         } catch (error) {
//             console.error('Error searching hotels!!:', error.response?.data?.error);
            
            
//         }
//     }

//     return (
//         <div className="hotel-page">
//             <div className="hero-section">
//                 <h1 className="hero-heading heroTagline">Discover Your Ideal Stay</h1>
//                 <div className="search-container">
//                     <div className="input-container citySearch" ref={inputRef}>
//                         <FaMapMarkerAlt className="input-icon city-icon" />
//                         <input
//                             type="text"
//                             className='inputDropdown'
//                             placeholder="City or Hotel"
//                             value={searchData.HotelOrCity}
//                             name='HotelOrCity'
//                             onChange={handleChange}
//                             onFocus={() => setShowSuggestions(true)}
//                         />
//                         {showSuggestions && (
//                             <ul className="suggestions-dropdown">
//                                 {suggestions.map((name, index) => (
//                                     <li key={index} onClick={() => handleCityOrHotelSelect(name)}>
//                                         <MdOutlineAddLocation className="dropdown-icon" /> {name}
//                                     </li>
//                                 ))}
//                             </ul>
//                         )}
//                     </div>
//                 </div>

//                 <div className="search-container">
//                     <DatePicker
//                         selected={searchData.checkInDate}
//                         onChange={(date) => handleDateChange(date, "CheckInDate")}
//                         placeholderText="Check-In Date"
//                         dateFormat="dd/MM/yyyy"
//                         customInput={<CustomInput onClear={() => handleDateChange(null, "CheckInDate")} />}
//                     />

//                     <DatePicker
//                         selected={searchData.checkOutDate}
//                         onChange={(date) => handleDateChange(date, "CheckOutDate")}
//                         placeholderText="Check-Out Date"
//                         dateFormat="dd/MM/yyyy"
//                         customInput={<CustomInput onClear={() => handleDateChange(null, "CheckOutDate")} />}
//                         name="checkOutDate"
//                     />

//                     <div className="input-container">
//                         <FaBed className="input-icon room-icon" />
//                         <input
//                             type="number"
//                             placeholder="Rooms"
//                             className="rooms-input"
//                             value={searchData.rooms}
//                             name="rooms"
//                             onChange={handleChange}
//                         />
//                     </div>

//                     <div className="input-container room-type-container">
//                         <select value={searchData.roomType} onChange={handleChange} name="roomType" className="room-type-dropdown">
//                             <option value="standard">Standard</option>
//                             <option value="deluxe">Deluxe</option>
//                         </select>
//                     </div>

//                     <button className="search-button" onClick={handleHotelSearch}>
//                         <FaSearch />
//                     </button>
//                 </div>
//             </div>

//             {/* Render hotel cards only if searchResults is not empty */}
//             <div className="hotel-cards-container">
//                 {searchResults.length > 0 ? (
//                     searchResults.map((hotel, index) => (
//                         <HotelCard
//                             key={index}
//                             name={hotel.name}
//                             location={hotel.location}
//                             rating={hotel.rating}
//                             priceStandard={hotel.pricePerNightStandard}
//                             priceDeluxe={hotel.pricePerNightDeluxe}
//                             roomType={searchData.roomType}
//                             availability={hotel[searchData.roomType]}
//                         />
//                     ))
//                 ) : (
//                     <p>No hotels found. Please search again.</p>
//                 )}
//             </div>
//         </div>
//     );
// }


import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaMapMarkerAlt, FaBed, FaCalendarAlt, FaTimes, FaSort } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/HotelPage.css';
import { MdOutlineAddLocation } from "react-icons/md";
import cities from 'cities.json';
import axios from "axios";
import HotelCard from '../components/hotelSearchResultsCard';

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
    const [hotels, setHotels] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(true);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [sortOption, setSortOption] = useState('price'); // Default sort option
    const inputRef = useRef(null);
    const [hotelId,setHotelId]=useState(undefined);
    const errorMessageRef = useRef(null);
    const resultsRef = useRef(null);
    
    
    const [searchData, setSearchData] = useState({
        HotelOrCity: '',
        checkInDate: null,
        checkOutDate: null,
        rooms: '',
        roomType: 'standard',
    });

    const indexedCities = {};
    cities.forEach(city => {
        const firstLetter = city.name[0].toLowerCase();
        if (!indexedCities[firstLetter]) {
            indexedCities[firstLetter] = [];
        }
        indexedCities[firstLetter].push(city.name);
    });

    useEffect(() => {
        async function fetchHotels() {
            try {
                console.log(response)
                const response = await axios.get('http://localhost:8000/api/v1/hotels/allHotels');
                const hotelNames = response.data.data.map(hotel => hotel.name);
                setHotels(hotelNames);
            } catch (error) {
                console.error("Error fetching Hotels:", error);
            }
        }

        fetchHotels();
    }, []);

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
                ).slice(0, 4);

                const combinedSuggestions = [...hotelSuggestions, ...citySuggestions].slice(0, 4);
                setSuggestions(combinedSuggestions);
                setShowSuggestions(true);
            } else {
                setShowSuggestions(false);
            }
        }
    }

    function handleDateChange(date, name) {
        setSearchData(prevState => ({
            ...prevState,
            [name === "CheckInDate" ? 'checkInDate' : 'checkOutDate']: date
        }));
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
        try {
            setErrorMessage(null);
            if (searchData.HotelOrCity === "") {
                setErrorMessage("Please enter a valid city or hotel name.");
                setShowErrorMessage(true);
                return;
            }

            const response = await axios.post('http://localhost:8000/api/v1/hotels/searchHotels', {
                hotelNameOrCity: searchData.HotelOrCity,
                roomType: searchData.roomType,
                numberOfRooms: searchData.rooms
            });
            setShowErrorMessage(false);
            const result = await response.data.data;
            
            setSearchResults(result);
            console.log(response.data.data)
            console.log("Search ans:",searchResults)
            console.log('hotel id hotel page : ',searchResults.id)
            
        } catch (error) {
            setErrorMessage(error.response?.data?.error);
            setShowErrorMessage(true);
            console.error('Error searching hotels:', error);
        }
    }
    
    

    // Sort results based on selected option
    function handleSortChange(e) {
        const option = e.target.value;
        setSortOption(option);

        const sortedResults = [...searchResults].sort((a, b) => {
            if (option === 'price') {
                return a[`pricePerNight${searchData.roomType.charAt(0).toUpperCase() + searchData.roomType.slice(1)}`] - 
                       b[`pricePerNight${searchData.roomType.charAt(0).toUpperCase() + searchData.roomType.slice(1)}`];
            } else if (option === 'rating') {
                return b.rating - a.rating;
            }
            return 0;
        });

        setSearchResults(sortedResults);
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
                        onChange={(date) => handleDateChange(date, "CheckInDate")}
                        placeholderText="Check-In Date"
                        dateFormat="dd/MM/yyyy"
                        customInput={<CustomInput onClear={() => handleDateChange(null, "CheckInDate")} />}
                    />

                    <DatePicker
                        selected={searchData.checkOutDate}
                        onChange={(date) => handleDateChange(date, "CheckOutDate")}
                        placeholderText="Check-Out Date"
                        dateFormat="dd/MM/yyyy"
                        customInput={<CustomInput onClear={() => handleDateChange(null, "CheckOutDate")} />}
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
                            

            {/* Error Message Section */}
            {errorMessage && (
                <div ref={errorMessageRef} className="error-message-hotel-search-results">
                    {errorMessage}
                </div>
            )}

            {/* Sort by Dropdown */}
            {!showErrorMessage && (
                <>
                <h2 ref={resultsRef} className='hotel-search-results-matched-head'>
                    {searchResults.length} Results Found
                </h2>
                <div className="sort-container">
                    <label htmlFor="sortBy">Sort by:</label>
                    <select id="sortBy" value={sortOption} onChange={handleSortChange} className="sort-dropdown">
                        <option value="price">Lowest Price</option>
                        <option value="rating">Highest Rating</option>
                    </select>
                </div>
                </>
            )}

            {/* Hotel Cards Display */}
            <div className="hotel-cards-container">
                {!showErrorMessage && (
                    searchResults.map((hotel, index) => (
                        <HotelCard
                            key={index}
                            name={hotel.name}
                            location={hotel.location}
                            rating={hotel.rating}
                            priceStandard={hotel.pricePerNightStandard}
                            priceDeluxe={hotel.pricePerNightDeluxe}
                            roomType={searchData.roomType}
                            availability={hotel[searchData.roomType]}
                            ratingCount={hotel.ratingCount}
                            hotelID={hotel.id}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
