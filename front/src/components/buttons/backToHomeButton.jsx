import styled from "styled-components"
import colors from "../../utils/style/colors"
import { Link } from "react-router-dom"

export default function BackToHomeButton() {
    return <BackButtonStyle to="/home">Retour à l'accueil</BackButtonStyle>
}

const BackButtonStyle = styled(Link)`
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 25px;
    padding: 3px;
    border: 1px solid ${colors.primary};
    // background-color: ${colors.secondary};
    color: dark;
    border-radius: 2%;
    :hover {
        cursor: pointer;
        box-shadow: 0px 0px 1px 1px ${colors.primary};
    }
`
