import React from "react";
import "../styles/LoginPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

export default function LoginPage() {
    const [loginData, setLoginData] = React.useState({
        userID: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false); // State to toggle password visibility
    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();
        try {
            if (loginData.userID === "" && loginData.password === "") {
                setErrorMessage("Please Enter User ID And Password");
                return;
            } else if (loginData.userID === "") {
                setErrorMessage("Please Enter User ID");
                return;
            } else if (loginData.password === "") {
                setErrorMessage("Please Enter Password");
                return;
            }
            const response = await axios.post("/api/login", {
                userID: loginData.userID,
                password: loginData.password
            });

            const { token } = response.data;

            // Store the token in localStorage/sessionStorage for future requests
            localStorage.setItem("token", token);

            // Navigate to the homepage or dashboard after successful login
            navigate("/home");
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message || "Invalid userID or password.");
            } else {
                setErrorMessage("Something went wrong. Please try again later.");
            }
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setLoginData((prevLoginData) => {
            return {
                ...prevLoginData,
                [name]: value
            };
        });
    }

    function handleSignup() {
        navigate("/signup");
    }

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="container">
            <div className="left-side">
                <h1 className="appTitle">BOOKNGO</h1>
                <h2 className="appTagline">Book Easy, Travel Happy – Your Ultimate Travel Companion!</h2>
            </div>
            <div className="right-side">
                <div className="login">
                    <form onSubmit={handleLogin}>
                        <input
                            placeholder="User ID"
                            type="text"
                            name="userID"
                            value={loginData.userID} // Change from username to userID
                            onChange={handleChange}
                        />
                        <div className="password-container">
                            <input
                                placeholder="Password"
                                type={showPassword ? "text" : "password"} // Toggle between text and password
                                name="password"
                                value={loginData.password}
                                onChange={handleChange}
                            />
                            {loginData.password && ( <div className="eye-icon" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon based on visibility */}
                                </div>
                            )}
                        </div>
                        {errorMessage && <p className="error">{errorMessage}</p>}
                        <button id="loginButton" type="submit">Login</button>
                        <button id="signupButton" type="button" onClick={handleSignup}>Create new account</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
