import { Link } from "react-router-dom"
import styled from "styled-components"
import colors from "../../utils/style/colors"

export function CancelFormButton({ text, link }) {
    return <FormButtonStyle to={link}>{text}</FormButtonStyle>
}

/* STYLE AND CSS */

const FormButtonStyle = styled(Link)`
    text-decoration: none;
    background-color: ${colors.backgroundLight};
    color: ${colors.primary};
    border-radius: 5px;
    height: 25px;
    margin-bottom: 15px;
    margin-top: 15px;
    border: 1px solid ${colors.primary};

    :hover {
        cursor: pointer;
        border: none;
        box-shadow: 0px 0px 0px 2px ${colors.primary};
        color: ${colors.primary};
        font-weight: bold;
    }
`
