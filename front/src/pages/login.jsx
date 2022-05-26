import styled from "styled-components"
import colors from "../utils/style/colors"
import logo from "../assets/livre_ouvert_violet.svg"
import { Link } from "react-router-dom"
import { useState } from "react"
import { logUser } from "../api/userApi"
import { useNavigate } from "react-router-dom"
import { LogFormButton } from "../components/buttons/logFormButton"
import { validateLogInFiedls } from "../utils/helper/regexp"
import Loading from "../components/loading"
import InvalidateLoginAction from "../components/layout/invalidateLoginAction"

// Logic / render side

export function LogIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    // prepare state for loader
    const [isLoading, setIsLoading] = useState(false)

    // to reset inputs after sending request
    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")

    // on form validation
    const [invalidateInputs, setInvalidateInputs] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password)
        const data = {
            email,
            password,
        }

        // check input entries
        if (validateLogInFiedls(email, password)) {
            setInvalidateInputs(false)
            setIsLoading(true)
            // log to the api with data entries
            logUser(data)
                .then((response) => {
                    // it's a good user
                    if (response.status === 200) {
                        // email and password are ok, we will use the token returned from back and log the user
                        localStorage.setItem(
                            "stack-overflou-token",
                            JSON.stringify(response.data.token)
                        )
                        setIsLoading(false)
                        return navigate("/home")
                    }
                })
                .catch((error) => {
                    // it's not good, we inform user why
                    setInvalidateInputs(true)
                    setErrorMessage(error.response.data.message)
                    emailInput.value = ""
                    passwordInput.value = ""
                    setIsLoading(false)
                    console.log(
                        "la response n'est pas ok au loguser, pris par le catch : " +
                            error.response.data.message
                    )
                })
        } else {
            alert("Format email ou mot de passe incorrect !")
            setInvalidateInputs(true)
        }
    }

    return isLoading ? (
        <Loading />
    ) : (
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
                {invalidateInputs ? (
                    <InvalidateLoginAction text={errorMessage} />
                ) : (
                    ""
                )}
                <LogFormButton text={"Log In"} />
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
    box-shadow: 0px 0px 4px 2px ${colors.primary};
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
