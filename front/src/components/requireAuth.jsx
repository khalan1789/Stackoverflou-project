import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getUserInfos } from "../api/userApi"
import { logInUser } from "../store/reducers/userReducer"

export function RequireAuth({ children, withAuth }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const token = JSON.parse(localStorage.getItem("stack-overflou-token"))

    useEffect(() => {
        if ((!token || !user.isLogged) && withAuth) {
            //if there is no user or no token
            if (token === null) {
                return navigate("/login")
            } else {
                // there is a token, we will check it
                getUserInfos(token)
                    .then((res) => {
                        if (res.status !== 200) {
                            return navigate("/login")
                        } else {
                            dispatch(logInUser(res.data.userInfos))
                        }
                    })
                    .catch((err) => console.log("erreur : " + err))
            }
        }
    })
    return <>{children}</>
}
