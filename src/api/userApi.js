import {
    handleResponse,
    handleError
} from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/users/";

export function verifyUsername(username) {
    return fetch(baseUrl + "?userName=" + username)
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok.");
            return response.json().then(users => {
                if (users.length === 0) throw new Error("Username not found: " + username);
                return {
                    validUsername: true
                };
            });
        })
        .catch(handleError);
}

export function verifyUsernameAndPassword(username, password) {
    return fetch(baseUrl + "?userName=" + username + "&password=" + password)
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok.");
            return response.json().then(users => {
                if (users.length === 0) throw new Error("User not found");
                return {
                    validUser: true
                };
            });
        })
        .catch(handleError);
}

export function saveUser(user) {
    return fetch(baseUrl, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.username,
                password: user.password
            })
        })
        .then(handleResponse)
        .catch(handleError);
}