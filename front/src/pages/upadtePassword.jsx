import { useState } from "react"
import styled from "styled-components"
import colors from "../utils/style/colors"
import logo from "../assets/livre_ouvert_violet.svg"
import { LogFormButton } from "../components/buttons/logFormButton"
import { validateUpdatePasswordFields } from "../utils/helper/regexp"
import { updatePassword } from "../api/userApi"
import { useNavigate } from "react-router-dom"

export function UpdatePassword() {
    const [passwordFirst, setPasswordFirst] = useState("")
    const [passwordTwice, setPasswordTwice] = useState("")
    const UrlParams = new URLSearchParams(window.location.search)
    const userId = UrlParams.get("id")
    const resetToken = UrlParams.get("token")
    const navigate = useNavigate()

    // comparing function
    function comparePassword(entry1, entry2) {
        if (entry1 === entry2) {
            return true
        } else {
            return false
        }
    }
    // update form function
    function handleSubmit(e) {
        e.preventDefault()
        if (passwordFirst.length < 8 || passwordTwice.length < 8) {
            alert("attention il faut au moins 8 charactères !")
        }
        const data = {
            token: resetToken,
            userId,
            password: passwordTwice,
        }
        // check if fields are okay to send data after
        if (validateUpdatePasswordFields(passwordFirst, passwordTwice)) {
            const fieldsOkToSend = comparePassword(passwordFirst, passwordTwice)
            if (fieldsOkToSend) {
                updatePassword(data)
                    .then((response) => {
                        if (response.status === 201) {
                            alert(
                                "la demande de changement a bien été effectuée, veuillez vous connectez à présent"
                            )
                            navigate("/login")
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        alert(
                            "La demande a échouée ou a expirée. Veuillez renouvellez la procédure de votre demande de nouveau via la page login."
                        )
                    })
            } else {
                alert(
                    "attention les mots de passes ne correspondent pas ! Revoyez votre saisie."
                )
            }
        }
    }

    return (
        <Container>
            <LogoStyle src={logo} alt="logo" />
            <h2>Mise à jour de votre mot de passe </h2>
            <FormStyle onSubmit={(e) => handleSubmit(e)}>
                <p>
                    N'oubliez pas : votre mot de passe doit contenir au moins 8
                    caractères!
                </p>
                <ParagraphStyle>
                    Mais attention toutefois car certains types de caractères ne
                    sont pas acceptés
                </ParagraphStyle>

                <FormInputContainerStyle>
                    <label htmlFor="password-first">Nouveau mot de passe</label>
                    <FormInputStyle
                        id="password-first"
                        onChange={(e) => setPasswordFirst(e.target.value)}
                        type="password"
                    ></FormInputStyle>
                </FormInputContainerStyle>
                <FormInputContainerStyle>
                    <label htmlFor="password-twice">
                        Ressaisissez le mot de passe
                    </label>
                    <FormInputStyle
                        id="password-twice"
                        onChange={(e) => setPasswordTwice(e.target.value)}
                        type="password"
                    ></FormInputStyle>
                </FormInputContainerStyle>

                <LogFormButton text={"Valider"} />
            </FormStyle>
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
    margin-bottom: 20px;
`

const FormInputStyle = styled.input`
    display: flex;
    height: 25px;
    padding: 1px;
`
const ParagraphStyle = styled.p`
    font-style: italic;
    font-size: 0.95rem;
`
