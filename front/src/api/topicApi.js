// topic api functions
import axios from "axios"

// create a base url for all request
const instance = axios.create({
    baseURL: "http://localhost:9000/api/",
})

export function createTopic(data) {
    const url = "/topic"
    const token = JSON.parse(localStorage.getItem("stack-overflou-token"))
    return instance
        .post(url, data, { headers: { authorization: token } })
        .then((response) => {
            return response
        })
        .catch((error) => console.log(error))
}

export function getAllTopic() {
    const url = "/topic"

    return instance
        .get(url)
        .then((response) => {
            return response.data
        })
        .catch()
}

export function getOneTopic(id) {
    const url = `/topic/${id}`
    console.log("url : " + url)

    return instance
        .get(url)
        .then((response) => {
            return response.data.topic
        })
        .catch((error) => console.log("errer getone topic", error))
}

export function deleteTopic(id) {
    const url = `/topic/${id}`
    const token = JSON.parse(localStorage.getItem("stack-overflou-token"))

    return instance
        .delete(url, { headers: { authorization: token } })
        .then((response) => {
            return response.status
        })
        .catch((error) => console.log("erreur delete : " + error))
}

export function updateTopic(id, data) {
    const url = `/topic/${id}`
    const token = JSON.parse(localStorage.getItem("stack-overflou-token"))

    return instance
        .put(url, data, { headers: { authorization: token } })
        .then((response) => {
            return response
        })
        .catch((error) => console.log(error))
}
