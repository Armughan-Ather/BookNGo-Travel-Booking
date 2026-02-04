// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-render-app-name.onrender.com' // Replace with your Render app URL
  : 'http://localhost:8000';

export const API_ENDPOINTS = {
  BASE_URL: API_BASE_URL,
  
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/v1/users/login`,
  REGISTER: `${API_BASE_URL}/api/v1/users/register`,
  AUTHENTICATE: `${API_BASE_URL}/api/v1/users/authenticate`,
  
  // Admin endpoints
  ADMIN_LOGIN: `${API_BASE_URL}/api/v1/admins/login`,
  
  // Hotels
  ALL_HOTELS: `${API_BASE_URL}/api/v1/hotels/allHotels`,
  SEARCH_HOTELS: `${API_BASE_URL}/api/v1/hotels/searchAvailableHotels`,
  
  // Flights
  ALL_AIRLINES: `${API_BASE_URL}/api/v1/airlines/allAirlines`,
  SEARCH_FLIGHTS: `${API_BASE_URL}/api/v1/flights/searchFlights`,
  
  // Packages
  SEARCH_PACKAGES: `${API_BASE_URL}/api/v1/bundle/searchValidBundles`,
  GET_BUNDLE_COST: `${API_BASE_URL}/api/v1/bundle/getBundleCost`,
  
  // Reservations
  RESERVE_HOTEL: `${API_BASE_URL}/api/v1/hotelReservation/reserveHotelRoom`,
  RESERVE_FLIGHT: `${API_BASE_URL}/api/v1/flightReservation/reserveFlight`,
  RESERVE_BUNDLE: `${API_BASE_URL}/api/v1/bundleReservation/reserveBundle`,
  
  // User history
  USER_HOTEL_HISTORY: `${API_BASE_URL}/api/v1/users/getUserHotelReservationHistory`,
  USER_FLIGHT_HISTORY: `${API_BASE_URL}/api/v1/users/getUserFlightReservationHistory`,
  USER_BUNDLE_HISTORY: `${API_BASE_URL}/api/v1/users/getUserBundleReservationHistory`,
};

export default API_BASE_URL;