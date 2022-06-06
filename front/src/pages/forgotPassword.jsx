import { useState } from "react"
import styled from "styled-components"
import colors from "../utils/style/colors"
import BackToHomeButton from "../components/buttons/backToHomeButton"
import { forgotPassword } from "../api/userApi"

export function ForgotPassword() {
    const [email, setEmail] = useState("")

    const regexpEmail = /^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,8}$/
    // here function to create
    function resetRequest(e) {
        e.preventDefault()
        if (regexpEmail.test(email)) {
            alert("ok on envoi")
            const data = {
                email,
            }
            forgotPassword(data)
                .then((res) => console.log("resp", res))
                .catch((err) => console.log("erreur", err))
        } else {
            alert(
                "le format de l'adresse saisie ne correspond pas àce qui est attendu"
            )
        }
    }

    return (
        <Container>
            <H3Style>Réinitialisation du mot de passe</H3Style>
            <ParagraphStyle>
                Veuillez entrer l'adresse email pour recevoir les instructions
                pour la réinitialisation
            </ParagraphStyle>
            <FormContainer action="submit">
                <label htmlFor="email">
                    <Input
                        type="email"
                        id="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></Input>
                </label>
            </FormContainer>
            <FormButton type="submit" onClick={(e) => resetRequest(e)}>
                Faire la demande
            </FormButton>
            <BackToHomeButton />
        </Container>
    )
}

// style CSS

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-left: 5%;
    margin-right: 5%;
`

const H3Style = styled.h3`
    text-align: center;
`

const ParagraphStyle = styled.p`
    text-align: justify;
`

const FormContainer = styled.form`
    width: 80%;
    margin-bottom: 30px;
    @media all and (min-width: 850px) {
        width: auto;
    }
`
const Input = styled.input`
    width: 100%;
    align-self: center;
    @media all and (min-width: 750px) {
        width: 600px;
    }
`
const FormButton = styled.button`
    background-color: ${colors.primary};
    color: white;
    border-radius: 5px;
    height: 50px;
    width: 180px;
    margin-bottom: 15px;
    :hover {
        cursor: pointer;
        border: none;
        box-shadow: 0px 0px 0px 2px ${colors.primary};
        color: ${colors.secondary};
    }
`
