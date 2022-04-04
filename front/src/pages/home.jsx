import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import colors from "../utils/style/colors"
import { logInUser, logOutUser } from "../store/reducers/userReducer"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { getUserInfos, LogOut } from "../api/api"
import { Topic } from "../components/layout/topic"

export function Home() {
    const user = useSelector((state) => state.user.infos)
    const isLoged = useSelector((state) => state.user.isLogged)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function logOut() {
        dispatch(logOutUser()) // à voir pour sortir la logique dans un autre fichier
        localStorage.removeItem("stack-overflou-token")
        navigate("/login")
    }

    // useEffect(() => {
    //     const token = JSON.parse(localStorage.getItem("stack-overflou-token"))
    //     console.log("tok : " + token) /* /////CONSOLE LOG\\\\\\\ */
    //     getUserInfos(token)
    //         .then((response) => {
    //             console.log(
    //                 "trouve : " + response.status
    //             ) /* /////CONSOLE LOG\\\\\\\ */
    //             dispatch(logInUser(response.data))
    //         })
    //         .catch((error) => console.log("erreur : " + error))
    // }, [dispatch])
    return (
        <HomeContainer>
            <Link to="/profile">Page profil</Link>
            <MainTitleStyled>Bienvenue sur stackoverflou </MainTitleStyled>
            <H3TitleStyled>L'endroit où l'on voit plus net après</H3TitleStyled>
            <p>
                Je vois : {user === null ? "personne connecté" : user.nickname}
            </p>
            <p> log : {isLoged ? "il est là" : "non pas connect"}</p>
            <button onClick={logOut}>Se déconnecter</button>
            <Topic />
        </HomeContainer>
    )
}

/* STYLE AND CSS */

const HomeContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 95%;
    padding-left: 2%;
    padding-right: 2%;
`
const MainTitleStyled = styled.h1`
    text-align: center;
`

const H3TitleStyled = styled.h3`
    text-align: center;
`
