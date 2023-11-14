import React, { useContext, useRef } from 'react'
import "./login.css"
import { loginCall } from '../../apiCall';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from "@material-ui/core"

export default function Login() {

    const email = useRef();
    const password = useRef();
    const { user, isFetching, dispatch, error } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch);
    }

    console.log(user);

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
                        <input placeholder="Email" className="loginInput" type='email' ref={email} />
                        <input placeholder="Password" type='password' required minLength="6" className="loginInput" ref={password} />
                        <button className="loginButton" type='submit'>
                            {isFetching ? <CircularProgress color='whitr' size="25px" /> :"Log in"}
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">
                        {isFetching ? <CircularProgress color='whitr' size="25px" /> :"Create a New Account"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
