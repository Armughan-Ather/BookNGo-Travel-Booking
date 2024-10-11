import './styles/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import FlightPage from "./pages/FlightPage";  
import HotelPage from "./pages/HotelPage"
import Layout from "./pages/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* pages without layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
          
        <Route element={<Layout />}> {/* Apply Layout to these routes */}
          {/* pages with layout */}
          <Route path="/" element={<HomePage />} />
          <Route path="/flights" element={<FlightPage />} />
          <Route path="/hotels" element={<HotelPage />} />

          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
