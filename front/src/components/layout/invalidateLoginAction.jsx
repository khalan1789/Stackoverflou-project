import styled from "styled-components"
import colors from "../../utils/style/colors"

export default function InvalidateLoginAction({ text }) {
    return <SmallInputAlert>{text}</SmallInputAlert>
}

/* STYLE AND CSS */

const SmallInputAlert = styled.small`
    display: flex;
    font-style: italic;
    color: ${colors.danger};
`
