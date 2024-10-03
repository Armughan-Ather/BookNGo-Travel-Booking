import React from "react"
import"../styles/SignUpPage.css"
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import axios from "axios"
export default function SignupPage(){
    const [signupData,setSignupData]=React.useState({
        userID:"",
        name:"",
        email:"",
        phoneNumber:"",
        password:"",
        
    })
    const [showPassword, setShowPassword] = React.useState(false); // State to toggle password visibility
    const [errorMessage, setErrorMessage] = React.useState("");
    
    console.log(signupData)
    
    function handleChange(event){
        const {name,value}=event.target
        setSignupData((prevSignupData)=>{
            return {
                ...prevSignupData,
                [name] : value
            }
        })
    }
    const navigate = useNavigate();
    function returnToLogin(){
        navigate("../login")
    }
    async function handleSignUp(event){
        event.preventDefault();
        let flag=0;
        for(let item in signupData){
            if(signupData[item]===""){
                setErrorMessage("Please Enter "+item[0].toUpperCase() +item.slice(1))
                flag=1;
                return
            }
        }
            if(flag){
                return
            }
            
            try{
                const response=await axios.post("/api/signup",{
                    userID:signupData.userID,
                    name:signupData.name,
                    email:signupData.email,
                    phoneNumber:signupData.phoneNumber,
                    password:signupData.password 
                })

                navigate("../login")
            }catch(error){
                if (error.response) {
                    setErrorMessage(error.response.data.message || "Invalid userID or password.");
                } else {
                    setErrorMessage("Something went wrong. Please try again later.");
                }
            
        }
    }
    function togglePasswordVisibility(){
        setShowPassword(prevSetShowPassword=>!prevSetShowPassword)
    }
    return (
        <div className="container">
            <div className="left-side">
                <h1 className="appTitle">BOOKNGO</h1>
                <h2 className="appTagline">Book Easy, Travel Happy – Your Ultimate Travel Companion!</h2>
            </div>
            <div className="right-side">
                <div className="signup">
                    <form onSubmit={handleSignUp}>
                        <input 
                            type="text"
                            placeholder="User ID"
                            name="userID"
                            value={signupData.userID}
                            onChange={handleChange}
                        />
                        <input 
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={signupData.name}
                            onChange={handleChange}
                        />
                        <input 
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={signupData.email}
                            onChange={handleChange}
                        />
                        <input 
                            type="number"
                            placeholder="Phone Number"
                            name="phoneNumber"
                            value={signupData.phoneNumber}
                            onChange={handleChange}
                        />
                        <div className="password-container">
                            <input
                                placeholder="Password"
                                type={showPassword ? "text" : "password"} // Toggle between text and password
                                name="password"
                                value={signupData.password}
                                onChange={handleChange}
                            />
                            {signupData.password && ( <div className="eye-icon" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon based on visibility */}
                                </div>
                            )}
                        </div>

                        
                        {/* <input
                            type="password"
                            placeholder="Confirm Password"
                            name="passwordConfirm"
                            value={signupData.passwordConfirm}
                            onChange={handleChange} 
                        /> */}
                        {errorMessage && <p className="error">{errorMessage}</p>}
                        
                        <button className="signupButton" type="submit">Sign Up</button>
                        <button className="BackloginButton" onClick={returnToLogin} type="button">Back to Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}