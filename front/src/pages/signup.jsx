import styled from "styled-components"
import colors from "../utils/style/colors"
import logo from "../assets/livre_ouvert_violet.svg"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { createUser } from "../api/userApi"
import { LogFormButton } from "../components/buttons/logFormButton"
import { validateCreateUserFields } from "../utils/helper/regexp"
import InvalidateSignupAction from "../components/layout/invalidateSignupAction"

export function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [nickname, setNickname] = useState("")
    const navigate = useNavigate()

    //check form validation
    const [invalidateInputs, setInvalidateInputs] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        //use all user information to fetch
        const data = {
            email,
            password,
            firstname,
            lastname,
            nickname,
        }
        console.log(data) /* /////CONSOLE LOG\\\\\\\ */
        if (
            validateCreateUserFields(
                firstname,
                lastname,
                nickname,
                email,
                password
            )
        ) {
            try {
                // call api with data
                createUser(data)
                    // and use status received to redirect on login if ok
                    .then((response) => {
                        if (response === 401) {
                            alert("Utilisateur déjà existant !")
                        } else if (response === 400) {
                            alert(
                                "Saisie incorrecte ! Chaque champs doit être d'au moins 2 charactères, le mot de passe en contenir au minimum 8"
                            )
                        } else if (response === 201) {
                            alert(
                                "Création de votre compte réussie ! Veuillez vous identifier à présent"
                            )
                            navigate("/login")
                        }
                    })
                    .catch((error) => console.log(error))
            } catch (error) {
                console.log("erreur en force", error.request.status)
            }
        } else {
            setInvalidateInputs(true)
            alert("Saisie incorrecte !")
        }
    }

    return (
        <Container>
            <LogoStyle src={logo} alt="logo" />
            <h1>Rejoignez-nous !</h1>
            <FormStyle onSubmit={handleSubmit}>
                <FormInputContainerStyle>
                    <label htmlFor="firstname">Prénom</label>
                    <FormInputStyle
                        id="firstname"
                        onChange={(e) => setFirstname(e.target.value)}
                    ></FormInputStyle>
                </FormInputContainerStyle>
                <FormInputContainerStyle>
                    <label htmlFor="lastname">Nom</label>
                    <FormInputStyle
                        id="lastname"
                        onChange={(e) => setLastname(e.target.value)}
                    ></FormInputStyle>
                </FormInputContainerStyle>
                <FormInputContainerStyle>
                    <label htmlFor="nickname">Pseudo</label>
                    <FormInputStyle
                        id="nickname"
                        onChange={(e) => setNickname(e.target.value)}
                    ></FormInputStyle>
                </FormInputContainerStyle>
                <FormInputContainerStyle>
                    <label htmlFor="email">Email</label>
                    <FormInputStyle
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                    ></FormInputStyle>
                </FormInputContainerStyle>
                <FormInputContainerStyle>
                    <label htmlFor="password">Mot de passe</label>
                    <FormInputStyle
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    ></FormInputStyle>
                </FormInputContainerStyle>
                {invalidateInputs && (
                    <InvalidateSignupAction
                        text={
                            "Les champs ne sont pas correctement saisis, veuillez revoir votre saisie."
                        }
                    />
                )}
                <LogFormButton text={"Valider l'inscription"} />
            </FormStyle>
            <p>
                Déjà inscrit? <Link to="/login">Par ici</Link>
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
`

const LogoStyle = styled.img`
    height: 50px;
    margin-top: 10px;
`

const FormStyle = styled.form`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    box-shadow: 0px 0px 4px 2px ${colors.primary};
    border-radius: 5px;
    min-width: 280px;
    padding: 10px;
`

const FormInputContainerStyle = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10px;
`

const FormInputStyle = styled.input`
    display: flex;
    height: 25px;
    padding: 1px;
`
