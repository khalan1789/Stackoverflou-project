import styled from "styled-components"
import colors from "../../utils/style/colors"
import { Link } from "react-router-dom"

export function CancelCommentFormUpdateButton({ link, text }) {
    return <FormCancelLink to={link}>{text}</FormCancelLink>
}

const FormCancelLink = styled(Link)`
    text-decoration: none;
    text-align: center;
    background-color: ${colors.btnLog};
    color: ${colors.primary};
    border-color: none;
    border-radius: 5px;
    height: 30px;
    margin-bottom: 15px;
    :hover {
        cursor: pointer;
        // background-color: ${colors.backgroundBase};
        border: none;
        box-shadow: 0px 0px 1px 2px ${colors.primary};
    }
`
