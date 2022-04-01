import styled from "styled-components"
import colors from "../utils/style/colors"
import logo from "../assets/livre_ouvert_violet.svg"
import { Link } from "react-router-dom"
import { useState } from "react"
import { logUser } from "../api/api"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logInUser } from "../store/reducers/userReducer"
import { LogFormButton } from "../components/buttons/logFormButton"

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const LogoStyle = styled.img`
    height: 50px;
    margin-top: 80px;
`

const FormStyle = styled.form`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    box-shadow: 0px 0px 4px 2px ${colors.backgroundLight};
    border-radius: 5px;
    min-width: 280px;
    padding: 10px;
    min-height: 30vh;
`

const FormInputContainerStyle = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
`

const FormInputStyle = styled.input`
    display: flex;

    margin-top: 7px;
    height: 30px;
    padding: 2px;
`

export function LogIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const stateLogUser = useSelector((state) => state.user.infos)

    // on form validation
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password)
        const data = {
            email,
            password,
        }
        // log to the api with data entries
        logUser(data)
            .then((res) => {
                console.log(res) /* /////CONSOLE LOG\\\\\\\ */
                if (res.status === 200) {
                    // localStorage.setItem("user", JSON.stringify(res.data)) => on va gérer avec le HOC maintenant
                    localStorage.setItem(
                        "stack-overflou-token",
                        JSON.stringify(res.data.token)
                    )
                    // update user state with response's infos
                    // const userInfos = [
                    //     res.data.firstname,
                    //     res.data.lastname,
                    //     res.data.nickname,  => on va gérer avec le HOC maintenant
                    //     res.data.email,
                    //     res.data.creationDate,
                    // ]
                    // dispatch(logInUser(userInfos))
                    console.log(
                        "state : " + stateLogUser
                    ) /* /////CONSOLE LOG\\\\\\\ */
                    return (
                        navigate("/home"),
                        console.log(
                            "state état 2 : " + stateLogUser
                        ) /* /////CONSOLE LOG\\\\\\\ */
                    )
                }
            })
            .catch((error) => console.log(error))
    }

    return (
        <Container>
            <LogoStyle src={logo} alt="logo" />
            <h1>Connectez vous !</h1>
            <FormStyle onSubmit={handleSubmit}>
                <FormInputContainerStyle>
                    <label htmlFor="email">Email</label>
                    <FormInputStyle
                        type="email"
                        id="email"
                        placeholder="entrez votre email ici"
                        onChange={(e) => setEmail(e.target.value)}
                    ></FormInputStyle>
                </FormInputContainerStyle>
                <FormInputContainerStyle>
                    <label htmlFor="password">Mot de passe</label>
                    <FormInputStyle
                        type="password"
                        id="password"
                        placeholder="entrez votre mot de passe ici"
                        onChange={(e) => setPassword(e.target.value)}
                    ></FormInputStyle>
                </FormInputContainerStyle>
                <LogFormButton text={"Log In"} />
            </FormStyle>
            <p>
                Pas encore de compte ? <Link to="/signup">inscrivez-vous</Link>
            </p>
        </Container>
    )
}

// // L'idée : centrer le composant au centre
//  - avec un champ email
//  - avec un champ mdp
//  - un changer de page en lien dessous
//   -un btn se connecter
