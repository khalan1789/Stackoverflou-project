// fichier pour les calls api
import axios from "axios"

// create a base url for all request
const instance = axios.create({
    baseURL: "http://localhost:9000/api/",
})

export function logUser(data) {
    // add login route to the url
    const loginUrl = "login"
    try {
        return instance.post(loginUrl, data).then((response) => {
            return response
        })
    } catch (error) {
        console.log(error)
    }
}

export function createUser(data) {
    // part of signup route
    const signupUrl = "signup"
    let status
    return instance
        .post(signupUrl, data)
        .then((response) => {
            // if request is ok
            console.log("response status : ", response.status)

            status = response.status
            return status
        })
        .catch((error) => {
            // is request is not ok because the user is already existing
            console.log("err status", error.request.status)
            status = error.request.status
            return status
        })
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

// delete user

export function deleteUser(id) {
    const url = `/user/${id}`
    const token = JSON.parse(localStorage.getItem("stack-overflou-token"))

    return instance
        .delete(url, { headers: { authorization: token } })
        .then((response) => {
            return response.status
        })
        .catch((error) => console.log(error))
}
