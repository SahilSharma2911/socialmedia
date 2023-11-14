import React, { useContext, useRef } from 'react'
import "./register.css"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {

    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const username = useRef();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match!");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try {
                await axios.post("/auth/register", user);
                navigate("/auth/login");
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">ST Social</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on ST Social.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Username" className="loginInput" required ref={username} />
                        <input placeholder="Email" className="loginInput" type='email' required ref={email} />
                        <input placeholder="Password" className="loginInput" type='password' required ref={password} />
                        <input placeholder="Password Again" className="loginInput" type='password' required ref={passwordAgain} />
                        <button className="loginButton" type='submit'>Sign Up</button>
                        <button className='loginRegisterButton'>
                            <Link to={"/login"} className='loginRegisterButton' >
                                Log into Account
                            </Link>
                        </button>


                    </form>
                    
                </div>
            </div>
        </div>
    )
}
