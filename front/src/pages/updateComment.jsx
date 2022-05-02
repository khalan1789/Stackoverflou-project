import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { GetOneComment, UpdateOneComment } from "../api/commentApi"
import { CommentTopicButton } from "../components/buttons/commentFormButton"
import { CancelCommentFormUpdateButton } from "../components/buttons/CancelCommentFormUpdateButton"
import colors from "../utils/style/colors"
import { useSelector } from "react-redux"

export function UpdateComment({ user_id, topic_id }) {
    const navigate = useNavigate()
    // on download
    // search id in the url
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")

    // prepare states for the comment
    const [comment, setComment] = useState("")
    const [topicId, setTopicId] = useState("")
    const user = useSelector((state) => state.user.infos)

    useEffect(() => {
        if (user !== null) {
            GetOneComment(id)
                .then((comment) => {
                    setComment(comment.content)
                    setTopicId(comment.topic_id)
                })
                .catch()
        }
    }, [id, user])

    function sendComment(e) {
        e.preventDefault()
        const data = {
            content: comment,
        }
        UpdateOneComment(id, data)
            .then((res) =>
                res.status === 201 // arr^été ici avant de paritr
                    ? (alert("commentaire modifié !"),
                      navigate(`/topic?id=${topicId}`))
                    : alert("aie le commentaire n'as pas pu être posté !")
            )
            .catch((error) => console.log(error))
    }

    return (
        <UpdateCommentContainerView>
            <CommentContainer>
                <Form id="form-comment">
                    <FormLabel htmlFor="form-comment">
                        Un commentaire ?
                    </FormLabel>
                    <FormInput
                        type="text"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        id="form-comment"
                    />
                    <CommentTopicButton
                        action={sendComment}
                        text={"Poster"}
                    ></CommentTopicButton>
                    <CancelCommentFormUpdateButton
                        link={`/topic?id=${topicId}`}
                        text={"Annuler"}
                    ></CancelCommentFormUpdateButton>
                </Form>
            </CommentContainer>
        </UpdateCommentContainerView>
    )
}

/* STYLE AND CSS */

const UpdateCommentContainerView = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
`

const CommentContainer = styled.div`
    background-color: ${colors.backgroundLight};
    padding: 5px;
    border: 1px solid ${colors.primary};
    display: flex;
    flex-direction: column;
    max-height: 350px;
    width: 80%;
    margin-top: 50px;
    @media all and (min-width: 950px) {
        max-width: 760px;
    }
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
`

const FormLabel = styled.label`
    text-align: center;
    margin-bottom: 5px;
`

const FormInput = styled.textarea`
    resize: none;
    min-height: 100px;
    margin-bottom: 8px;
    height: 70%;
    font-size: 1rem;
`
