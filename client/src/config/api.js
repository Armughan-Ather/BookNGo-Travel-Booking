// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  BASE_URL: API_BASE_URL,
  
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/v1/users/login`,
  REGISTER: `${API_BASE_URL}/api/v1/users/register`,
  AUTHENTICATE: `${API_BASE_URL}/api/v1/users/authenticate`,
  
  // Admin endpoints
  ADMIN_LOGIN: `${API_BASE_URL}/api/v1/admins/login`,
  GET_ALL_HOTELS: `${API_BASE_URL}/api/v1/admins/getAllHotels`,
  ADD_HOTEL: `${API_BASE_URL}/api/v1/admins/addHotel`,
  UPDATE_HOTEL: `${API_BASE_URL}/api/v1/admins/updateHotel`,
  GET_ALL_AIRLINES: `${API_BASE_URL}/api/v1/admins/getAllAirlines`,
  ADD_AIRLINE: `${API_BASE_URL}/api/v1/admins/addAirline`,
  GET_ALL_FLIGHTS: `${API_BASE_URL}/api/v1/admins/getAllFlights`,
  ADD_FLIGHT: `${API_BASE_URL}/api/v1/admins/addFlight`,
  UPDATE_FLIGHT: `${API_BASE_URL}/api/v1/admins/updateFlight`,
  UPDATE_HOTEL_RESERVATION_STATUS: `${API_BASE_URL}/api/v1/admins/updateHotelReservationStatuses`,
  UPDATE_FLIGHT_RESERVATION_STATUS: `${API_BASE_URL}/api/v1/admins/updateFlightReservationStatuses`,
  
  // Hotels
  ALL_HOTELS: `${API_BASE_URL}/api/v1/hotels/allHotels`,
  SEARCH_HOTELS: `${API_BASE_URL}/api/v1/hotels/searchAvailableHotels`,
  UPDATE_HOTEL_RATING: `${API_BASE_URL}/api/v1/hotels/updateHotelRating`,
  
  // Airlines & Flights
  ALL_AIRLINES: `${API_BASE_URL}/api/v1/airlines/allAirlines`,
  SEARCH_FLIGHTS: `${API_BASE_URL}/api/v1/flights/searchFlights`,
  UPDATE_AIRLINE_RATING: `${API_BASE_URL}/api/v1/airlines/updateAirlineRating`,
  
  // Packages
  SEARCH_PACKAGES: `${API_BASE_URL}/api/v1/bundle/searchValidBundles`,
  GET_BUNDLE_COST: `${API_BASE_URL}/api/v1/bundle/getBundleCost`,
  UPDATE_BUNDLE_RATING: `${API_BASE_URL}/api/v1/bundle/updateBundleRating`,
  
  // Reservations
  RESERVE_HOTEL: `${API_BASE_URL}/api/v1/hotelReservation/reserveHotelRoom`,
  RESERVE_FLIGHT: `${API_BASE_URL}/api/v1/flightReservation/reserveFlight`,
  RESERVE_BUNDLE: `${API_BASE_URL}/api/v1/bundleReservation/reserveBundle`,
  UPDATE_HOTEL_RESERVATION: `${API_BASE_URL}/api/v1/hotelReservation/updateHotelReservation`,
  UPDATE_HOTEL_RESERVATION_2: `${API_BASE_URL}/api/v1/hotelReservation/updateHotelReservation2`,
  UPDATE_FLIGHT_RESERVATION: `${API_BASE_URL}/api/v1/flightReservation/updateFlightReservation`,
  UPDATE_FLIGHT_RESERVATION_2: `${API_BASE_URL}/api/v1/flightReservation/updateFlightReservation2`,
  
  // Cancellations
  CANCEL_FLIGHT_RESERVATION: `${API_BASE_URL}/api/v1/cancelledFlightReservation/cancelFlightReservation`,
  CANCEL_HOTEL_RESERVATION: `${API_BASE_URL}/api/v1/cancelledHotelReservation/cancelHotelReservation`,
  CANCEL_BUNDLE_RESERVATION: `${API_BASE_URL}/api/v1/cancelledBundleReservation/cancelBundleReservation`,
  
  // User history
  USER_HOTEL_HISTORY: `${API_BASE_URL}/api/v1/users/getUserHotelReservationHistory`,
  USER_FLIGHT_HISTORY: `${API_BASE_URL}/api/v1/users/getUserFlightReservationHistory`,
  USER_BUNDLE_HISTORY: `${API_BASE_URL}/api/v1/users/getUserBundleReservationHistory`,
};

export default API_BASE_URL;