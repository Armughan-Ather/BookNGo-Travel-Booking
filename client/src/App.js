// import './styles/App.css';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import HomePage from "./pages/HomePage";
// import FlightPage from "./pages/FlightPage";  
// import HotelPage from "./pages/HotelPage"
// import Layout from "./pages/Layout";
// import HotelReservationPage from "./pages/hotelReservationPage"
// import PaymentForm from './pages/PaymentForm';
// import FlightReservationPage from './pages/flightReservation';
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* pages without layout */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
          
//         <Route element={<Layout />}> {/* Apply Layout to these routes */}
//           {/* pages with layout */}
//           <Route path="/" element={<HomePage />} />
//           <Route path="/flights" element={<FlightPage />} />
//           <Route path="/hotels" element={<HotelPage />} />
//           <Route path="/hotels/reservation" element={<HotelReservationPage />} />
//           <Route path="/flights/reservation" element={<FlightReservationPage />} />
//           <Route path='/payment' element={<PaymentForm />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import './styles/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutPage from './pages/AboutPage';
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import FlightPage from "./pages/FlightPage";  
import HotelPage from "./pages/HotelPage";
import PackagesPage from './pages/packagePage';
import ProfilePage from './pages/profilePage';
import Layout from "./pages/Layout";
import HotelReservationPage from './pages/hotelReservationPage';
import PaymentForm from './pages/PaymentForm';
import FlightReservationPage from './pages/flightReservation';
import ProtectedRoute from './components/ProtectedRoute'; 
import PageNotFound from './pages/NotFound/PageNotFound';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages without layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        <Route element={<Layout />}> {/* Apply Layout to these routes */}
          {/* Pages with layout */}
          <Route path="/" element={<HomePage />} />
          <Route path="/flights" element={<FlightPage />} />
          <Route path="/hotels" element={<HotelPage />} />
          <Route path='/packages' element={<PackagesPage/>} />
          <Route path='/about' element={<AboutPage/>} />
          
          {/* Protected Routes */}
          <Route 
            path="/hotels/reservation" 
            element={<ProtectedRoute><HotelReservationPage /></ProtectedRoute>} 
          />
          <Route 
            path="/flights/reservation" 
            element={<ProtectedRoute><FlightReservationPage /></ProtectedRoute>} 
          />
          <Route
           path='/payment' 
           element={<ProtectedRoute><PaymentForm /></ProtectedRoute>} 
           />
           <Route
           path='/profile' 
           element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} 
           />

            
        </Route>
        <Route element={<Layout />}>
          <Route path='*' element={<PageNotFound/>} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
