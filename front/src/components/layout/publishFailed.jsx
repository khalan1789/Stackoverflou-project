import styled from "styled-components"
import colors from "../../utils/style/colors"

export default function PublishFailedAction() {
    return (
        <SmallInputAlert>
            Une erreur est survenue lors de la publication de l'article.
            Veuillez essayer de nouveau.
        </SmallInputAlert>
    )
}

/* STYLE AND CSS */

const SmallInputAlert = styled.small`
    display: flex;
    font-style: italic;
    color: ${colors.danger};
`
