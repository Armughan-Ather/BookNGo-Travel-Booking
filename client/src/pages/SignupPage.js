import React from "react"
import"../styles/SignUpPage.css"
import { useNavigate } from "react-router-dom";

export default function SignupPage(){
    const [signupData,setSignupData]=React.useState({
        username:"",
        email:"",
        phoneNumber:"",
        password:"",
        passwordConfirm:""
    })
    console.log(signupData)
    function handleSignUp(){

    }
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
                            placeholder="Username"
                            name="username"
                            value={signupData.username}
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
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={signupData.password}
                            onChange={handleChange} 
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="passwordConfirm"
                            value={signupData.passwordConfirm}
                            onChange={handleChange} 
                        />
                        <button className="signupButton">Sign Up</button>
                        <button className="BackloginButton" onClick={returnToLogin}>Back to Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}