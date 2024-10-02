import logo from './logo.svg';
import './styles/App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage" 
import SignupPage from "./pages/SignupPage"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
// import Layout from "./pages/Layout";
// import Home from "./pages/Home";
// import Blogs from "./pages/Blogs";
// import Contact from "./pages/Contact";
// import NoPage from "./pages/NoPage";

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <BrowserRouter>
      <Routes>
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
          {/* <Route path="/" element={<Layout />}> */}
          <Route path="/login" element={<LoginPage /> }></Route>
          <Route path="/signup" element={<SignupPage /> }></Route>
          <Route path='/' element={<HomePage /> }></Route>
          {/* <Route element={<Home />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */} 
        {/* { </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
