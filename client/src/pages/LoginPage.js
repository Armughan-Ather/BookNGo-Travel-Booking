import React from "react";
import "../styles/LoginPage.css";

export default function LoginPage() {
    const [loginData, setLoginData] = React.useState({
        username: "",
        password: ""
    });

    console.log(loginData);
    function handleLogin(){
        
    }
    function handleChange(event) {
        const {name,value}=event.target
        setLoginData((prevLoginData) => {
            return {
                ...prevLoginData,
                [name]: value
            };
        });
    }

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
                            placeholder="Username"
                            type="text"
                            name="username"
                            value={loginData.username}
                            onChange={handleChange}
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={loginData.password}
                            onChange={handleChange}
                        />
                        <button id="loginButton">Login</button>
                         <button id="singupButton" type="button"><a href="./signup">Create new account</a></button> 
                        
                    </form>
                </div>
            </div>
        </div>
    );
}
