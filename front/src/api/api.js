// fichier pour les calls api
import axios from "axios";
// import { useNavigate } from "react-router-dom";

// create a base url for all request
const instance = axios.create({
    baseURL: "http://localhost:9000/api/",
});

export function logUser(data) {
    // add login route to the url
    const loginUrl = "login";

    return instance.post(loginUrl, data);
}

export function createUser(data) {
    // part of signup route
    const signupUrl = "signup";

    return instance
        .post(signupUrl, data)
        .then((response) =>
            // response.status === 201
            //     ? console.log(response.data)
            //     : console.log(response.status)
            {
                return response;
            }
        )
        .catch((error) => console.log(error));
}

/* 
loguser version 1 
export function logUser(email, password) {
    const loginUrl = "login";
    const data = {
        email,
        password,
    };

    instance
        .post(loginUrl, data)
        .then((response) =>
            response.status === 200
                ? (localStorage.setItem("user", JSON.stringify(response.data)),
                  console.log(response.data))
                : console.log(response)
        )
        //     console.log("rep" + response.status)
        // )

        .catch((error) => console.log(error));
}

*/
