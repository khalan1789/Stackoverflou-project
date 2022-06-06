import styled from "styled-components"
import colors from "../../utils/style/colors"

export function LogFormButton({ text }) {
    return <FormButtonStyle>{text}</FormButtonStyle>
}

/* STYLE AND CSS */

const FormButtonStyle = styled.button`
    background-color: ${colors.primary};
    color: white;
    border-radius: 5px;
    height: 30px;
    &: hover {
        cursor: pointer;
    }
`
