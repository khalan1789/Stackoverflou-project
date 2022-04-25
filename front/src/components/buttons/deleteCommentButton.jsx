import styled from "styled-components"
import colors from "../../utils/style/colors"

export default function DeleteTopicButton({ text, action }) {
    return <DeleteButton onClick={action}>{text}</DeleteButton>
}

const DeleteButton = styled.button`
    background-color: ${colors.btnLog};
    border: 1px solid ${colors.btnSign};
    // box-shadow: 0px 0px 1px 0px ${colors.primary};
    // border-radius: 5px;
    // align-self: end;
    height: 30px;
    color: ${colors.primary};
    :hover {
        cursor: pointer;
        color: ${colors.danger};
    }
`
