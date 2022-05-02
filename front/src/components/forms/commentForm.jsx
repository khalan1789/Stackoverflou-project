import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { createComment } from "../../api/commentApi"
import colors from "../../utils/style/colors"
import { CommentTopicButton } from "../buttons/commentFormButton"

export function SendCommentForm({ user_id, topic_id }) {
    const [comment, setComment] = useState()
    const navigate = useNavigate()
    const data = {
        content: comment,
        topic_id,
        user_id,
    }
    function sendComment(e) {
        e.preventDefault()
        createComment(data)
        setComment("")
        navigate(`/topic?id=${topic_id}`)
        alert("commentaire posté !")
        window.location.reload(true)
    }

    return (
        <CommentContainer>
            <Form id="form-comment">
                <FormLabel htmlFor="form-comment">Un commentaire ?</FormLabel>
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
            </Form>
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
    min-height: 150px;
    width: 100%;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const FormLabel = styled.label`
    text-align: center;
    margin-bottom: 5px;
`

const FormInput = styled.textarea`
    resize: none;
    min-height: 100px;
    margin-bottom: 8px;
`
