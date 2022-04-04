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
        .then((response) =>
            // response.status === 201
            //     ? console.log(response.data)
            //     : console.log(response.status)
            {
                return response
            }
        )
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

// export function LogOut() {
//     const dispatch = useDispatch()
//     // const navigate = useNavigate()

//     dispatch(logOutUser)
//     localStorage.removeItem("stack-overflou-token")
// }
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


// version 1 de getUserInfos
export function getUserInfos() {
    const userUrl = "/auth/checkToken"
    const token = JSON.parse(localStorage.getItem("stack-overflou-token"))
    console.log("tok check : " + token)
    return instance
        .get(userUrl, { headers: { authorization: token } })
        .then((response) => {
            return response
        })
        .catch((error) => console.log(error))
}
*/
