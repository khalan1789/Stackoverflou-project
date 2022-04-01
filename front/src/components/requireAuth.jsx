import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getUserInfos } from "../api/api"
import { logInUser } from "../store/reducers/userReducer"

export function RequireAuth({ children, withAuth }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const token = JSON.parse(localStorage.getItem("stack-overflou-token"))

    useEffect(() => {
        if (!user.isLogged && withAuth) {
            if (token === null) {
                return navigate("/login")
            } else {
                // return navigate("/login") ici sinon on va voir pour check le token
                // ici mettre la logique de check token
                getUserInfos(token)
                    .then((res) => {
                        if (res.status !== 200) {
                            return navigate("/login")
                            // return console.log(res.status)
                        } else {
                            let userObject = res.data.userInfos.nickname

                            dispatch(logInUser(res.data.userInfos)) //** ça bloque ici avec l'erreur ***//
                            console.log(" voyons : " + userObject)
                        }
                    })
                    .catch((err) => console.log("erreur : " + err))
            }
        }
    })
    return <>{children}</>
}

/*
.then((response) => {
                        console.log("rep status withAuth: " + response.status)
                        // if (res.status === 403) {
                        //     // *** JE SUIS BLOQUE ICI le status passe pas car probleme de gestion de la reponse!***/ //
//     return (
//         navigate("/login"), console.log("invalid token")
//     )
// }
// dispatch(logInUser(res.data.data))
// })
// .catch((err) => console.log("error : " + err)) */
