import styled from "styled-components"
import colors from "../../utils/style/colors"

export default function DeleteUserButton({ action }) {
    return (
        <DeleteButton type="button" onClick={action}>
            Supprimer mon compte
        </DeleteButton>
    )
}

const DeleteButton = styled.button`
    background-color: ${colors.backgroundBase};
    border: 1px solid ${colors.backgroundLight};
    color: ${colors.primary};
    width: 98%;
    // box-shadow: 0px 0px 1px 0px ${colors.primary};
    // border-radius: 5px;
    margin-bottom: 5px;
    margin-top: 25px;
    align-self: center;
    :hover {
        cursor: pointer;
        color: ${colors.danger};
        background-color: ${colors.secondary};
    }
`
