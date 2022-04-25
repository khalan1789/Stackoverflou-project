import styled from "styled-components"
import colors from "../../utils/style/colors"

export function TopicFormButton({ text }) {
    return <FormButtonStyle type="submit">{text}</FormButtonStyle>
}

/* STYLE AND CSS */

const FormButtonStyle = styled.button`
    background-color: ${colors.primary};
    color: white;
    border-radius: 5px;
    height: 30px;
    margin-bottom: 15px;
    :hover {
        cursor: pointer;
        border: none;
        box-shadow: 0px 0px 0px 2px ${colors.primary};
    }
`
