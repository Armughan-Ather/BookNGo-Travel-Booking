import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBTypography } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/SignUpPage.css";

export default function SignupPage() {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    userName: "",
    password: "",
    confirmPassword: "" // Added confirmPassword field
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for confirm password visibility
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    if (!signupData.name || !signupData.email || !signupData.phoneNo || !signupData.userID || !signupData.password || !signupData.confirmPassword) {
      setErrorMessage("Please fill all the fields.");
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("/api/signup", signupData);
      if (response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong. Please try again later.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignupData((prevSignupData) => ({
      ...prevSignupData,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <MDBContainer fluid className="signup-page d-flex align-items-center justify-content-center">
      <MDBRow className="w-100">
        <MDBCol md="6" className="left-col">
          <MDBTypography tag="h1" className="appTitle">BOOKNGO</MDBTypography>
          <MDBTypography tag="h2" className="appTagline">
            Join us and start your journey today!
          </MDBTypography>
        </MDBCol>
        <MDBCol md="6" className="right-col">
          <div className="signup-form-container">
            <form onSubmit={handleSignup} className="signup-form">
              <MDBInput
                label="Full Name"
                type="text"
                name="name"
                value={signupData.name}
                onChange={handleChange}
                required
                className="input-fields-form"
              />
              <MDBInput
                label="Email"
                type="email"
                name="email"
                value={signupData.email}
                onChange={handleChange}
                required
                className="input-fields-form"
              />
              <MDBInput
                label="Phone Number"
                type="text"
                name="phoneNo"
                value={signupData.phoneNo}
                onChange={handleChange}
                required
                className="input-fields-form"
              />
              <MDBInput
                label="User Name"
                type="text"
                name="userName"
                value={signupData.userName}
                onChange={handleChange}
                required
                className="input-fields-form"
              />
              <div className="password-container">
                <MDBInput
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={signupData.password}
                  onChange={handleChange}
                  required
                  className="input-fields-form"
                />
                <div className="eye-icon" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <div className="confirm-password-container">
                <MDBInput
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={signupData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="input-fields-form"
                />
                <div className="eye-icon" onClick={toggleConfirmPasswordVisibility}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {errorMessage && <p className="error">{errorMessage}</p>}
              <MDBBtn type="submit" className="w-100 mb-4 button-field-form signup-button" >Sign Up</MDBBtn>
              <MDBBtn type="button" className="w-100 button-field-form" onClick={() => navigate("/login")}>Back to Login</MDBBtn>
            </form>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
