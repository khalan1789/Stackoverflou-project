import styled from "styled-components"
import colors from "../../utils/style/colors"

export default function InvalidateSignupAction() {
    return (
        <SmallInputAlert>
            Les champs ne sont pas correctement saisis, veuillez revoir votre
            saisie.
        </SmallInputAlert>
    )
}

/* STYLE AND CSS */

const SmallInputAlert = styled.small`
    font-style: italic;
    color: ${colors.danger};
`
