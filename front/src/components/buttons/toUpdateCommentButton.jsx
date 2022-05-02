import { Link } from "react-router-dom"
import styled from "styled-components"
import colors from "../../utils/style/colors"

export function ToUpdateCommentButton({ text, link }) {
    return <ModificationButtonStyle to={link}>{text}</ModificationButtonStyle>
}

/* STYLE AND CSS */

const ModificationButtonStyle = styled(Link)`
 text-decoration: none;
    background-color: ${colors.backgroundBase};
    border: 1px solid ${colors.btnSign};
    // box-shadow: 0px 0px 1px 0px ${colors.primary};
    // border-radius: 5px;
    // align-self: end;
    margin-bottom: 15px;
    margin-top: 10px;
    text-align: center;
    // font-size: 0.9rem;
    height: 30px;
    color: ${colors.primary};
    :hover {
        cursor: pointer;
        color: ${colors.danger};
`
