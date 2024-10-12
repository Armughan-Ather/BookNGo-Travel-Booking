import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaCalendarAlt, FaTimes, FaUser } from 'react-icons/fa';
import { MdFlightTakeoff, MdFlightLand, MdFlight } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/FlightPage.css';
import cities from 'cities.json'; // Assuming cities.json is available for city suggestions

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
    // const [searchInput, setSearchInput] = useState({ from: '', to: '' });
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);
    const [searchData,setSearchData]=React.useState({
        origin:"",
        destination:"",
        airline:"",
        departureDate1:"",
        departureDate2:"",
        travelers:"",
    })
    const indexedCities = {};
    cities.forEach(city => {
        const firstLetter = city.name[0].toLowerCase();
        if (!indexedCities[firstLetter]) {
            indexedCities[firstLetter] = [];
        }
        indexedCities[firstLetter].push(city.name);
    });

    // function handleInputChange(event, type) {
    //     const value = event.target.value.toLowerCase();
    //     setSearchInput(prev => ({ ...prev, [type]: value }));

    //     if (value.length > 0) {
    //         const firstLetter = value[0];
    //         const citySuggestions = indexedCities[firstLetter]?.filter(city =>
    //             city.toLowerCase().includes(value)
    //         ) || [];
    //         setSuggestions(citySuggestions.slice(0, 4));
    //         setShowSuggestions(true);
    //     } else {
    //         setShowSuggestions(false);
    //     }
    // }

    function handleCitySelect(city, type) {
        // setSearchInput(prev => ({ ...prev, [type]: city }));
        // setShowSuggestions(false);
    }

    function handleChange(e){
        const {name,value}=e.target;
        
        if ((name === "travelers" && (value === '' || (Number.isInteger(+value) && +value >= 0))) || name !== "travelers") {
            setSearchData((prevSearchData)=>{
                return {
                    ...prevSearchData,
                    [name]:value
                }
            })
        }
        
    }
    console.log(searchData)
    function handleDateChange(date,name){
        if(name==="Depart1"){
            setSearchData((prevSearchData)=>{
                return {
                    ...prevSearchData,
                    departureDate1:date
                }
            })
        }
        else{
            setSearchData((prevSearchData)=>{
                return {
                    ...prevSearchData,
                    departureDate2:date
                }
            })
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
    }, []);

    return (
        <div className="flight-page">
            <div className="flight-hero-section">
                <h1 className="flight-hero-heading">Soar to New Destinations!</h1>
                <div className="flight-search-container">

                    {/* First Line: From and To Inputs */}
                    <div className="flight-input-row">
                        <div className="flight-input-container flight-citySearch flight-from-and-to" ref={inputRef}>
                            <MdFlightTakeoff className="flight-input-icon flight-bigger-icon" />
                            <input
                                type="text"
                                className="flight-inputDropdown"
                                placeholder="From"
                                name='origin'
                                value={searchData.origin}
                                onChange={handleChange}
                                onFocus={() => setShowSuggestions(true)}
                            />
                            {showSuggestions && (
                                <ul className="flight-suggestions-dropdown">
                                    {suggestions.map((city, index) => (
                                        <li key={index} onClick={() => handleCitySelect(city, 'from')}>
                                            {city}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="flight-input-container flight-citySearch flight-from-and-to" ref={inputRef}>
                            <MdFlightLand className="flight-input-icon flight-bigger-icon" />
                            <input
                                type="text"
                                className="flight-inputDropdown"
                                placeholder="To"
                                value={searchData.destination}
                                name="destination"
                                onChange={handleChange}
                                onFocus={() => setShowSuggestions(true)}
                            />
                            {showSuggestions && (
                                <ul className="flight-suggestions-dropdown">
                                    {suggestions.map((city, index) => (
                                        <li key={index} onClick={() => handleCitySelect(city, 'to')}>
                                            {city}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Second Line: Airline, Departure, Return, Travelers */}
                    <div className="flight-input-row">
                        <div className="flight-input-container">
                            <MdFlight className="flight-input-icon flight-bigger-icon" />
                            <input
                                type="text"
                                className="flight-airline-input"
                                placeholder="Airline"
                                value={searchData.airline}
                                name="airline"
                                onChange={handleChange}
                            />
                        </div>

                        <DatePicker
                            selected={searchData.departureDate1}
                            onChange={(date) => handleDateChange(date,"Depart1")}
                            placeholderText="Departure Date"
                            dateFormat="dd/MM/yyyy"
                            customInput={<CustomInput onClear={() => handleDateChange(null,"Depart1")} />}
                        />

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

                    {/* Third Line: Search Button */}
                    <div className="flight-search-button-container">
                        <button className="btn btn-warning flight-search-button">
                            <FaSearch className='flight-search-icon'/> {/* Only the search icon here */}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
