import { Link } from "react-router-dom"
import styled from "styled-components"
import colors from "../../utils/style/colors"

export function ToUpdateProfileButton({ text, link }) {
    return <ModificationButtonStyle to={link}>{text}</ModificationButtonStyle>
}

/* STYLE AND CSS */

const ModificationButtonStyle = styled(Link)`
    text-decoration: none;
    margin-bottom: 15px;
    margin-top: 10px;
    border: 1px solid ${colors.primary};
    background-color: white;
    color: ${colors.primary};
    cursor: pointer;
    padding: 1%;
    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
        cursor: pointer;
        box-shadow: 0px 0px 1px 1px ${colors.primary};
    }
`
