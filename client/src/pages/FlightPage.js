import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaCalendarAlt, FaTimes, FaUser } from 'react-icons/fa';
import { MdFlightTakeoff, MdFlightLand, MdFlight,MdAirlines } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/FlightPage.css';
import axios from 'axios'; // Import axios for API requests

// Custom Date Picker Input
const CustomInput = React.forwardRef(({ onClick, value, onClear, placeholder }, ref) => (
    <div className="flight-input-container" ref={ref}>
        <FaCalendarAlt className="flight-input-icon" onClick={onClick} />
        <input
            type="text"
            className="flight-date-input"
            placeholder={value || placeholder}
            value={value}
            readOnly
            onClick={onClick}
        />
        {value && (
            <FaTimes className="flight-clear-icon" onClick={onClear} />
        )}
    </div>
));

export default function FlightPage() {
    const [fromSuggestions, setFromSuggestions] = useState(['Karachi','Lahore','Quetta']);
    const [toSuggestions, setToSuggestions] = useState(['Islamabad']);
    const [showFromSuggestions, setShowFromSuggestions] = useState(false);
    const [showToSuggestions, setShowToSuggestions] = useState(false);
    const [showAirlineSuggestions, setShowAirlineSuggestions] = useState(false);
    const fromRef = useRef(null);
    const toRef = useRef(null);
    const airlineRef = useRef(null);

    const [searchData, setSearchData] = useState({
        origin: "",
        destination: "",
        airline: "",
        departureDate1: "",
        departureDate2: "",
        travelers: "",
    });
    const [airlineSuggestions, setAirlineSuggestions] = useState([]);
    const [airlineSearch, setAirlineSearch] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [showErrorMessage,setShowErrorMessage]=React.useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    
    // Fetch airlines from backend when the page loads
    useEffect(() => {
        async function fetchAirlines() {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/airlines/allAirlines');
                const airlineNames = response.data.data.map(airline => airline.name);
                setAirlineSearch(airlineNames);
            } catch (error) {
                console.error('Error fetching airlines:', error);
            }
        }

        fetchAirlines();
    }, []);

    // Fetch from cities from backend
    useEffect(() => {
        async function fetchFromCities() {
                try {
                    const response = await axios.get(`http://localhost:8000/api/v1/cities/from?search=`);
                    setFromSuggestions(response.data.data);
                    setShowFromSuggestions(true);
                } catch (error) {
                    console.error('Error fetching from cities:', error);
                }
            } 
        
            fetchFromCities();
    }, []);

    // Fetch to cities from backend
    useEffect(() => {
        async function fetchToCities() {
                try {
                    const response = await axios.get(`http://localhost:8000/api/v1/cities/to?search=`);
                    setToSuggestions(response.data.data);
                    setShowToSuggestions(true);
                } catch (error) {
                    console.error('Error fetching to cities:', error);
                }
            
        }
        fetchToCities()
    }, []);

    // Handle changes in the airline input
    function handleAirlineChange(e) {
        const value = e.target.value;
        setSearchData((prevSearchData) => ({
            ...prevSearchData,
            airline: value
        }));

        if (value.length > 0) {
            const airlineSuggestions = airlineSearch.filter(airline =>
                airline.toLowerCase().includes(value.toLowerCase())
            ).slice(0, 3);
            setAirlineSuggestions(airlineSuggestions);
            setShowAirlineSuggestions(true);
        } else {
            setShowAirlineSuggestions(false);
        }
    }

    // Handle selection of an airline from the suggestions
    function handleAirlineSelect(airline) {
        setSearchData((prev) => ({
            ...prev,
            airline: airline
        }));
        setShowAirlineSuggestions(false);
    }
    
    // Handle city selection for "From" and "To"
    function handleCitySelect(name, type) {
        setSearchData((prev) => ({
            ...prev,
            [type]: name // Update the correct field
        }));    
        
        if (type === 'origin') {
            setShowFromSuggestions(false); // Close the dropdown
        } else {
            setShowToSuggestions(false); // Close the dropdown
        }
    }

    // Handle changes in the input fields
    function handleChange(e) {
        const { name, value } = e.target;

        if ((name === "travelers" && (value === '' || (Number.isInteger(+value) && +value >= 0))) || name !== "travelers") {
            setSearchData((prevSearchData) => ({
                ...prevSearchData,
                [name]: value
            }));
        }
    }

    // Handle changes in date selection
    function handleDateChange(date, name) {
        if (name === "Depart1") {
            setSearchData((prevSearchData) => ({
                ...prevSearchData,
                departureDate1: date
            }));
        } else {
            setSearchData((prevSearchData) => ({
                ...prevSearchData,
                departureDate2: date
            }));
        }
    }
    async function handleFlightSearch()
    {
        try {
            if (searchData.origin === "" || searchData.destination=== "") {
                setErrorMessage("Kindly Fill The 'From' and 'To' Fields!")
                return;
            }
            const response = await axios.post('http://localhost:8000/api/v1/flights/searchFlights', {
                origin:searchData.origin, 
                destination:searchData.destination,
                numberOfSeats:searchData.travelers, 
                fromDate:searchData.departureDate1,
                toDate:searchData.departureDate2, 
                airlineName:searchData.airline
                
            });
            setShowErrorMessage(false);
            setSearchResults(response.data.data);
            console.log("Search response:", response.data.data);
        } catch (error) {
            setErrorMessage(error.response?.data?.error);
            setShowErrorMessage(true);
            
            console.error('Error searching flights!:', error.response?.data?.error);
        }
    }
    
    useEffect(() => {
        function handleClickOutside(event) {
            // Check if the click is outside all input containers
            if (
                fromRef.current && !fromRef.current.contains(event.target) &&
                toRef.current && !toRef.current.contains(event.target) &&
                airlineRef.current && !airlineRef.current.contains(event.target)
            ) {
                setShowFromSuggestions(false);
                setShowToSuggestions(false);
                setShowAirlineSuggestions(false);
            }
        }
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    return (
        <div className="flight-page">
            <div className="flight-hero-section">
                <h1 className="flight-hero-heading">Soar to New Destinations!</h1>
                <div className="flight-search-container">

                    {/* First Line: From and To Inputs */}
                    <div className="flight-input-row">
                        <div className="flight-input-container flight-citySearch flight-from-and-to" ref={fromRef}>
                            <MdFlightTakeoff className="flight-input-icon flight-bigger-icon" />
                            <input
                                type="text"
                                className="flight-inputDropdown"
                                placeholder="From"
                                name='origin'
                                value={searchData.origin}
                                onChange={(e) => {
                                    handleChange(e);
                                    if (e.target.value.length > 0) {
                                        setShowFromSuggestions(true); // Show dropdown if there's input
                                    } else {
                                        setShowFromSuggestions(false); // Hide dropdown if empty
                                    }
                                }}
                                onFocus={() => {
                                    if (searchData.origin.length > 0) {
                                        setShowFromSuggestions(true);
                                    }
                                }}
                            />
                            {showFromSuggestions && (
                                <ul className="flight-suggestions-dropdown">
                                    {fromSuggestions.map((name, index) => (
                                        <li key={index} onClick={() => handleCitySelect(name, 'origin')}>
                                            <MdFlightTakeoff className='flight-dropdown-icon'/>{name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="flight-input-container flight-citySearch flight-from-and-to" ref={toRef}>
                            <MdFlightLand className="flight-input-icon flight-bigger-icon" />
                            <input
                                type="text"
                                className="flight-inputDropdown"
                                placeholder="To"
                                value={searchData.destination}
                                name="destination"
                                onChange={(e) => {
                                    handleChange(e);
                                    if (e.target.value.length > 0) {
                                        setShowToSuggestions(true); // Show dropdown if there's input
                                    } else {
                                        setShowToSuggestions(false); // Hide dropdown if empty
                                    }
                                }}
                                onFocus={() => {
                                    if (searchData.destination.length > 0) {
                                        setShowToSuggestions(true);
                                    }
                                }}
                            />
                            {showToSuggestions && (
                                <ul className="flight-suggestions-dropdown">
                                    {toSuggestions.map((name, index) => (
                                        <li key={index} onClick={() => handleCitySelect(name, 'destination')}>
                                           <MdFlightLand className='flight-dropdown-icon'/> {name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Second Line: Airline Input */}
                    <div className="flight-input-row">
                        <div className="flight-input-container flight-citySearch"  ref={airlineRef}>
                            <MdFlight className="flight-input-icon flight-bigger-icon" />
                            <input
                                type="text"
                                className="flight-inputDropdown"
                                placeholder="Airline"
                                value={searchData.airline}
                                onChange={handleAirlineChange}
                                onFocus={() => {
                                    if (searchData.airline.length > 0) {
                                        setShowAirlineSuggestions(true);
                                    }
                                }}
                            />
                            {showAirlineSuggestions && (
                                <ul className="flight-suggestions-dropdown">
                                    {airlineSuggestions.map((airline, index) => (
                                        <li key={index} onClick={() => handleAirlineSelect(airline)}>
                                           <MdFlight className='flight-dropdown-icon'/> {airline}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Departure Date 1 */}
                        <DatePicker
                            selected={searchData.departureDate1}
                            onChange={(date) => handleDateChange(date,"Depart1")}
                            placeholderText="Departure Date"
                            dateFormat="dd/MM/yyyy"
                            customInput={<CustomInput onClear={() => handleDateChange(null,"Depart1")} />}
                        />

                        {/* Departure Date 2 */}
                        <DatePicker
                            selected={searchData.departureDate2}
                            onChange={(date) => handleDateChange(date,"Depart2")}
                            placeholderText="Departure Date"
                            dateFormat="dd/MM/yyyy"
                            customInput={<CustomInput onClear={() => handleDateChange(null,"Depart2")} />}
                        />

                        <div className="flight-input-container">
                            <FaUser className="flight-input-icon" />
                            <input
                                type="number"
                                className="flight-traveler-input"
                                placeholder="Travelers"
                                name='travelers'
                                value={searchData.travelers}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flight-search-button-container">
                        <button className="btn btn-warning flight-search-button" onClick={handleFlightSearch}>
                            <FaSearch className='flight-search-icon'/> {/* Only the search icon here */}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
