import { useState } from "react"
import styled from "styled-components"
import colors from "../utils/style/colors"
import logo from "../assets/livre_ouvert_violet.svg"
import { LogFormButton } from "../components/buttons/logFormButton"
import { validateUpdatePasswordFields } from "../utils/helper/regexp"

export function UpdatePassword() {
    const [passwordFirst, setPasswordFirst] = useState("")
    const [passwordTwice, setPasswordTwice] = useState("")
    const UrlParams = new URLSearchParams(window.location.search)
    const userId = UrlParams.get("id")
    const resetToken = UrlParams.get("token")

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
        const data = {
            userId,
            token: resetToken,
            password: passwordTwice,
        }
        if (validateUpdatePasswordFields(passwordFirst, passwordTwice)) {
            comparePassword(passwordFirst, passwordTwice)
                ? alert("ok les mêmes !!")
                : // ici reste à récup l'id et le token, et d'envoyer les datas
                  alert("pas pareil!!!")
        }

        console.log("ui", userId)
        console.log("token", resetToken)
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

                {/* {invalidateInputs && (
                    <InvalidateSignupAction
                        text={
                            "Les champs ne sont pas correctement saisis, veuillez revoir votre saisie."
                        }
                    />
                )} */}
                {/* <LogFormButton text={"Valider l'inscription"} /> */}
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
