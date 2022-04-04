import styled from "styled-components"
import colors from "../../utils/style/colors"

export default function InvalidateLoginAction() {
    return (
        <SmallInputAlert>
            Saisie de l'email ou du mot de passe incorrecte. Veuillez revoir
            votre saisie.
        </SmallInputAlert>
    )
}

/* STYLE AND CSS */

const SmallInputAlert = styled.small`
    font-style: italic;
    color: ${colors.danger};
`
