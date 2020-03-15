import React, { useState } from 'react';
import * as userApi from "../api/userApi";
import TextInput from "./common/TextInput";
import {Link } from "react-router-dom";


function Login(props) {
    const [errors, setErrors] = useState({});
    const [state, setState] = useState({
        usernameChecked: false,
        passwordChecked: false,
        formButtonValue: "Next"
    });

    function formIsValid() {
        const _errors = {};
        if (!props.user.username) _errors.username = "Username is required";
        if (state.usernameChecked && !props.user.password) _errors.password = "Password is required";
        console.log(_errors, state);
        setErrors(_errors);
        // Form is valid if the errors object has no properties
        return Object.keys(_errors).length === 0;
    }
  
    function handleUsername(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setState({
            ...state,
            formButtonValue: "Verifying"
        });
        userApi.verifyUsername(props.user.username)
        .then(() => {
            setState({
                ...state,
                usernameChecked: true,
                formButtonValue: "Sign in"
            })
        })
        .catch( (e) => {
            const _errors = {};
            if (e) _errors.username = "The username is not recognized.";
            setErrors(_errors);
            setState({
                ...state,
                formButtonValue: "Next"
            });
        });
    }

    function handlePassword(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setState({
            ...state,
            formButtonValue: "Verifying"
        });
        userApi.verifyUsernameAndPassword(props.user.username, props.user.password)
        .then(() => {
            props.history.push("/Home");
        })
        .catch( (e) => {
            const _errors = {};
            if (e) _errors.password = "Incorrect password";
            setErrors(_errors);
            setState({
                ...state,
                formButtonValue: "Sign in"
            });
        });
    }

    function back() {
        setState({
            ...state,
            usernameChecked: false,
            formButtonValue: "Next"
        });
        props.user.password = "";
    }

    return (
        !state.usernameChecked ?
        <>
            <h4 className="form-title">Sign in</h4>
            <form onSubmit={handleUsername}>
                <TextInput
                    id="username"
                    label="Username"
                    onChange={props.handleChange}
                    name="username"
                    value={props.user.username}
                    error={errors.username}
                />
                <input type="submit" value={state.formButtonValue} className="btn btn-primary btn-block" />
            </form>
            <div className="new-div">
                <span className="new-div-span">New to Autodesk?</span>
                <button type="button" className="btn btn-link" >
                    <Link to="/register">Create account</Link>
                </button>
            </div>
        </>
        :
        <>
            <div className="d-flex">
                <button type="button" className="btn btn-link" onClick={back}>
                    <i className="material-icons md-36 text-primary back-div">keyboard_arrow_left</i>
                </button>
                
                <div className="p-2 flex-grow-1 welcome-div">
                    <div className="h3">
                        Welcome
                    </div>
                    <div style={{opacity: 0.7}}>
                        {props.user.username}
                    </div>
                </div>
            </div>
            <form onSubmit={handlePassword}>
                <TextInput
                    id="password"
                    label="Password"
                    onChange={props.handleChange}
                    name="password"
                    value={props.user.password}
                    error={errors.password}
                    type="password"
                />
                <input type="submit" value={state.formButtonValue} className="btn btn-primary btn-block" />
            </form>
        </>   
    );
}
export default Login;