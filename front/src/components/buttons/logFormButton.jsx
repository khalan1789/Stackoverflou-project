import styled from "styled-components"
import colors from "../../utils/style/colors"

const FormButtonStyle = styled.button`
    background-color: ${colors.backgroundLight};
    color: white;
    border-radius: 5px;
    height: 30px;
`

export function LogFormButton({ text }) {
    return <FormButtonStyle>{text}</FormButtonStyle>
}
