import './styles/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
// import FlightPage from "./pages/FlightPage";  
import Layout from "./pages/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        <Route element={<Layout />}> {/* Apply Layout to these routes */}
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/flight" element={<FlightPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
