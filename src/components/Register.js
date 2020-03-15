import React, {useState} from 'react';
import * as userApi from "../api/userApi";
import TextInput from "./common/TextInput";
import { useHistory } from "react-router-dom";

function Register(props) {
    const [user, setUser] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        reTypeUsername: "",
        reTypePassword: ""
    });
    const [errors, setErrors] = useState({});
    const history = useHistory();

    function handleChange({ target }) {
        setUser({
          ...user,
          [target.name]: target.value.trim()
        });
    }
    function signIn() {
      history.push("/login");
    }
    
    function formIsValid() {
        const _errors = {};
        if (!user.firstName) _errors.firstName = "Please enter your first name";
        if (!user.lastName) _errors.lastName = "Please enter your last name";
        if (!user.username) _errors.username = "Please enter valid username";
        if (!user.reTypeUsername || user.username !== user.reTypeUsername) _errors.reTypeUsername = "Please enter same username";
        if (!user.password) _errors.password = "Please enter valid password";
        if (!user.reTypePassword || user.password !== user.reTypePassword) _errors.reTypePassword = "Please enter same password";
        setErrors(_errors);
        // Form is valid if the errors object has no properties
        return Object.keys(_errors).length === 0;
    }
    function register(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        userApi.verifyUsername(user.username).then(() => {
            const _errors = {};
            _errors.username = "Username already exists";
            setErrors(_errors);
        })
        .catch( () => {
            userApi.saveUser(user).then(() => {
                props.showToast(user.username);
                props.history.push("/login/"+user.username);
            });
        });
    }
    return (
        <>
        <h4 className="form-title">Create account</h4>
        <form onSubmit={register}>
            <div className="row">
                <TextInput
                    id="firstName"
                    label="First name"
                    onChange={handleChange}
                    name="firstName"
                    value={user.firstName}
                    error={errors.firstName}
                    isCol="true"
                />
                <TextInput
                    id="lastName"
                    label="Last name"
                    onChange={handleChange}
                    name="lastName"
                    value={user.lastName}
                    error={errors.lastName}
                    isCol="true"
                />
            </div>
            <TextInput
                id="username"
                label="Username"
                onChange={handleChange}
                name="username"
                value={user.username}
                error={errors.username}
            />
            <TextInput
                id="reTypeUsername"
                label="Re-type Username"
                onChange={handleChange}
                name="reTypeUsername"
                value={user.reTypeUsername}
                error={errors.reTypeUsername}
            />
            <TextInput
                id="password"
                label="Password"
                onChange={handleChange}
                name="password"
                value={user.password}
                error={errors.password}
                type="password"
            />
            <TextInput
                id="reTypePassword"
                label="Re-type Password"
                onChange={handleChange}
                name="reTypePassword"
                value={user.reTypePassword}
                error={errors.reTypePassword}
                type="password"
            />
            <input type="submit" value="Create account" className="btn btn-primary btn-block" />
        </form>
        <div className="new-div">
            <span className="new-div-span">Already have an account?</span>
            <button type="button" className="btn btn-link" onClick={signIn} >Sign in</button>
        </div>
        </>
    )
}

export default Register;