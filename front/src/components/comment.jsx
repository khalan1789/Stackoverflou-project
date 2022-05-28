import { useSelector } from "react-redux"
import styled from "styled-components"
import { deleteComment } from "../api/commentApi"
import editDate from "../utils/helper/editDate"
import colors from "../utils/style/colors"
import DeleteCommentButton from "./buttons/deleteCommentButton"
import { ToUpdateCommentButton } from "./buttons/toUpdateCommentButton"

export function Comment({ content, date, nickname, id, user_id }) {
    const editedDate = editDate(date)
    const user = useSelector((state) => state.user.infos)

    //function delete comment
    function deleteThisComment(id) {
        deleteComment(id)
            .then((res) => {
                //check the status returned to inform user if it's good or not
                if (res.status !== 201) {
                    alert("commentaire supprimé avec succès !")
                    return window.location.reload()
                } else {
                    console.log("type of status returned : " + res.status)
                }
            })
            .catch((error) => console.log("erreur del com : " + error))
    }
    return (
        <CommentContainer key={id}>
            <H3Style>{content}</H3Style>
            <ParagraphStyle>
                {nickname} le {editedDate}
            </ParagraphStyle>
            {user.userId === user_id && (
                <>
                    <ToUpdateCommentButton
                        text={"modifier"}
                        link={`/comment/update/?id=${id}`}
                    />
                    <DeleteCommentButton
                        text={"supprimer le commentaire"}
                        action={() => deleteThisComment(id)}
                    />
                </>
            )}
            {
                // delete control admin section
                user !== null && user.isAdmin && (
                    <DeleteCommentButton
                        text={"supprimer le commentaire"}
                        action={() => deleteThisComment(id)}
                    />
                )
            }
        </CommentContainer>
    )
}
/* STYLE AND CSS */

const CommentContainer = styled.div`
    background-color: ${colors.backgroundLight};
    padding: 5px;
    border: 1px solid ${colors.primary};
    display: flex;
    flex-direction: column;
    // min-height: 150px;
    width: 100%;
    margin-bottom: 15px;
    // box-shadow: 0px 0px 2px 1px ${colors.primary};
    // @media all and (min-width: 960px) {
    //     width: 80%;
    // }
`
const H3Style = styled.h4`
    line-height: 0.7rem;
    margin-left: 5px;
`

const ParagraphStyle = styled.p`
    text-align: end;
    font-style: italic;
`
