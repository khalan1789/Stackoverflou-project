// topic api functions
import axios from "axios"

// create a base url for all request
const instance = axios.create({
    baseURL: "http://localhost:9000/api/",
})

// create a comment

export function createComment(data) {
    const url = "/message"
    const token = JSON.parse(localStorage.getItem("stack-overflou-token"))

    return instance
        .post(url, data, { headers: { authorization: token } })
        .then((response) => {
            return console.log("rep : " + response)
        })
        .catch((error) => console.log(error))
}

// get all comments for one topic
export function getAllComments(id) {
    const url = `/message/by_topic/${id}`

    return instance
        .get(url)
        .then((response) => {
            return response.data
        })
        .catch((error) => console.log(error))
}

// delete comment
export function deleteComment(id) {
    const url = `/message/${id}`
    const token = JSON.parse(localStorage.getItem("stack-overflou-token"))

    return instance
        .delete(url, { headers: { authorization: token } })
        .then((response) => {
            return response.status
        })
        .catch((error) => console.log(error))
}

// get one comment
export function GetOneComment(id) {
    const url = `/message/${id}`
    const token = JSON.parse(localStorage.getItem("stack-overflou-token"))
    return instance
        .get(url, { headers: { authorization: token } })
        .then((response) => {
            return response.data.comment
        })
        .catch((error) => console.log(error))
}

// update comment
export function UpdateOneComment(id, data) {
    const url = `/message/${id}`
    const token = JSON.parse(localStorage.getItem("stack-overflou-token"))
    return instance
        .put(url, data, { headers: { authorization: token } })
        .then((response) => {
            return response
        })
        .catch((error) => console.log(error))
}
