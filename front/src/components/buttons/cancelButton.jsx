import { Link } from "react-router-dom"
import styled from "styled-components"
import colors from "../../utils/style/colors"

export default function CancelButton({ link }) {
    return <CancelButtonStyle to={link}>X</CancelButtonStyle>
}

const CancelButtonStyle = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: end;
    width: 50px;
    height: 50px;
    margin-right: 25px;
    margin-bottom: 15px;
    border: solid 1px ${colors.primary};
    background-color: ${colors.backgroundLight};
    color: ${colors.primary};
    text-decoration: none;
    border-radius: 50%;
    :hover {
        cursor: pointer;
        background-color: ${colors.primary};
        color: ${colors.backgroundLight};
        font-weight: bold;
    }
    @media all and (min-width: 1000px) {
        margin-right: 30px;
    }
    @media all and (min-width: 1250px) {
        height: 40px;
        width: 40px;
        // margin-right: 10%;
    }
`
