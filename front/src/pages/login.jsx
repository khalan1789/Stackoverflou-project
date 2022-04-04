import styled from "styled-components"
import colors from "../utils/style/colors"
import logo from "../assets/livre_ouvert_violet.svg"
import { Link } from "react-router-dom"
import { useState } from "react"
import { logUser } from "../api/api"
import { useNavigate } from "react-router-dom"
// import { useDispatch, useSelector } from "react-redux"
import { LogFormButton } from "../components/buttons/logFormButton"
import { validateLogInFiedls } from "../utils/helper/regexp"
import InvalidateLoginAction from "../components/layout/invalidateLoginAction"

// Logic / render side

export function LogIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    // to reset inputs after sending request
    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")

    // on form validation
    const [isDisabled, setIsDisabled] = useState(true)
    const [invalidateInputs, setInvalidateInputs] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password)
        const data = {
            email,
            password,
        }

        // check input entries
        if (validateLogInFiedls(email, password)) {
            setIsDisabled(false)
            setInvalidateInputs(false)
            // log to the api with data entries
            logUser(data)
                .then((response) => {
                    console.log(
                        "réponse : " + response
                    ) /* /////CONSOLE LOG\\\\\\\ */
                    console.log(
                        "token : " + response.data.token
                    ) /* /////CONSOLE LOG\\\\\\\ */
                    console.log(
                        "status : " + response.status
                    ) /* /////CONSOLE LOG\\\\\\\ */
                    if (response.status === 202) {
                        // localStorage.setItem("user", JSON.stringify(res.data)) => on va gérer avec le HOC maintenant
                        console.log(
                            "token dans le if : " + response.data.token
                        ) /* /////CONSOLE LOG\\\\\\\ */
                        localStorage.setItem(
                            "stack-overflou-token",
                            JSON.stringify(response.data.token)
                        )
                        console.log(
                            "status dans le if : " + response.status
                        ) /* /////CONSOLE LOG\\\\\\\ */
                        return navigate("/home")
                    } else {
                        console.log("erreur status est : " + response.status)
                        alert(" erreur email ou mot de passe incorrect !")
                        emailInput.value = ""
                        passwordInput.value = ""
                    }
                })
                .catch((error) => console.log(error))
        } else {
            alert("Format email ou mot de passe incorrect !")
            setInvalidateInputs(true)
        }
    }

    return (
        <Container>
            <LogoStyle src={logo} alt="logo" />
            <h1>Connectez vous !</h1>
            <FormStyle onSubmit={handleSubmit} disabled={isDisabled}>
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
                {invalidateInputs ? <InvalidateLoginAction /> : ""}
                <LogFormButton text={"Log In"} disabled={isDisabled} />
            </FormStyle>
            <p>
                Pas encore de compte ? <Link to="/signup">Inscrivez-vous</Link>
            </p>
        </Container>
    )
}

/* STYLE AND CSS */

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-left: 5%;
    margin-right: 5%;
    // @media all and (min-width: 1200px) {
    //     width: 450px;
    // }
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
    margin-left: 5%;
    margin-right: 5%;
    @media all and (min-width: 1100px) {
        max-width: 450px;
    }
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

// // L'idée : centrer le composant au centre
//  - avec un champ email
//  - avec un champ mdp
//  - un changer de page en lien dessous
//   -un btn se connecter
