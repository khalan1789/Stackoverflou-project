// fichier pour les calls api
import axios from "axios"

// create a base url for all request
const instance = axios.create({
    baseURL: "http://localhost:9000/api/",
})

export function logUser(data) {
    // add login route to the url
    const loginUrl = "login"

    return instance
        .post(loginUrl, data) // problème après pour la gestion de la réponse
        .then((response) => {
            return response
        })
        .catch((error) => console.log("je passe au catch du api : " + error))
}

export function createUser(data) {
    // part of signup route
    const signupUrl = "signup"

    return instance
        .post(signupUrl, data)
        .then((response) => {
            return response
        })
        .catch((error) => console.log(error))
}

export function getUserInfos(token) {
    const userUrl = "/auth/checkToken"

    console.log("tok check : " + token)
    return instance
        .get(userUrl, { headers: { authorization: token } })
        .then((response) => {
            return response.data
        })
        .catch((error) => console.log(error))
}

// update user

export function updateUserInfos(id, data) {
    const url = `/user/${id}`
    const token = JSON.parse(localStorage.getItem("stack-overflou-token"))

    return instance
        .put(url, data, { headers: { authorization: token } })
        .then((response) => {
            if (response.status === 201) {
                return response.data
            } else {
                console.log("status rep up :" + response.status)
            }
        })
        .catch((error) => console.log(error))
}
