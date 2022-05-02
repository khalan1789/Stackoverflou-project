import styled from "styled-components"
import colors from "../../utils/style/colors"

export default function UpdateTopicButton({ text, action }) {
    return <DeleteButton onClick={action}>{text}</DeleteButton>
}

const DeleteButton = styled.button`
    background-color: ${colors.btnLog};
    border: 1px solid ${colors.backgroundLight};
    // box-shadow: 0px 0px 1px 0px ${colors.primary};
    width: 98%;
    align-self: center;
    // border-radius: 5px;
    // align-self: end;
    margin-top: 30px;
    margin-bottom: 22px;
    :hover {
        cursor: pointer;
        color: ${colors.backgroundLight};
        background-color: ${colors.btnProfile};
    }
    @media all and (min-width: 650px) {
        margin-bottom: 15px;
    }
`
