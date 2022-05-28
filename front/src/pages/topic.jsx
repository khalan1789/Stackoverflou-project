import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { deleteTopic, getOneTopic } from "../api/topicApi"
import { SendCommentForm } from "../components/forms/commentForm"
import editDate from "../utils/helper/editDate"
import colors from "../utils/style/colors"
import { getAllComments } from "../api/commentApi"
import { Comment } from "../components/comment"
import CancelButton from "../components/buttons/cancelButton"
import DeleteTopicButton from "../components/buttons/deleteTopicButton"
import Loading from "../components/loading"
import UpdateTopicButton from "../components/buttons/updateTopicButton"

// reload
// import { logInUser } from "../store/reducers/userReducer" /** à voir si ça peut être une soluce au reload */

export function Topic() {
    // search id in the url
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")

    // topic gestion
    // redux user state
    const user = useSelector((state) => state.user.infos)

    // prepare states for the topic
    const [topicDate, setTopicDate] = useState()
    const [topicDescription, setTopicDescription] = useState("")
    const [topicTitle, setTopicTitle] = useState("")
    const [topicAuthorId, setTopicAuthorId] = useState("")
    const [topicId, setTopicId] = useState("")
    const [topicAuthor, setTopicAuthor] = useState("")

    // prepare states for comments
    const [comments, setComments] = useState([])

    // prepare state for loader
    const [isLoading, setIsLoading] = useState(false)

    // call api using id
    useEffect(() => {
        if (user !== null) {
            setIsLoading(true)
            getOneTopic(id)
                .then((topicInfos) => {
                    setTopicDescription(topicInfos.description)
                    setTopicTitle(topicInfos.title)
                    setTopicAuthorId(topicInfos.user_id)
                    setTopicId(topicInfos._id)
                    setTopicAuthor(topicInfos.nickname)
                    // transforming date
                    setTopicDate(editDate(topicInfos.creationDate))
                })
                .catch((error) => console.log("erreur > " + error))

            getAllComments(id)
                .then((res) => setComments(res.messages))
                .catch((error) => console.log("erreur > " + error))

            setIsLoading(false)
        }
    }, [id, user])

    const navigate = useNavigate()

    const removeTopic = (topicId) => {
        deleteTopic(topicId)
            .then((response) =>
                response === 201
                    ? (window.alert("Article supprimé ! "), navigate("/home"))
                    : console.log(" problem with delete response : " + response)
            )
            .catch((error) => console.log(error))
    }

    return isLoading ? (
        <Loading />
    ) : (
        <PageTopicContainer>
            <CancelButton link={"/home"} />
            <TopicContainer>
                <TopicHeaderContainer>
                    <TopicTitleStyle>{topicTitle}</TopicTitleStyle>
                    <PublisherInfosContainer>
                        <p>
                            Par :
                            <PublisherAuthorSpan>
                                {topicAuthor}
                            </PublisherAuthorSpan>
                        </p>
                        <p>Posté le {topicDate}</p>
                    </PublisherInfosContainer>
                </TopicHeaderContainer>
                <DescriptionParagraphStyle>
                    {topicDescription}
                </DescriptionParagraphStyle>

                {user !== null && user.userId && topicAuthorId === user.userId && (
                    <>
                        <UpdateTopicButton
                            text={"Modifier l'article"}
                            action={() =>
                                navigate(`/topic/update/?id=${topicId}`)
                            }
                        ></UpdateTopicButton>
                        <DeleteTopicButton
                            action={() => removeTopic(topicId)}
                            text={"Supprimer l'article"}
                        ></DeleteTopicButton>
                    </>
                )}

                {
                    /* delete control by admin */
                    user !== null && user.isAdmin && (
                        <DeleteTopicButton
                            action={() => removeTopic(topicId)}
                            text={"Supprimer l'article"}
                        ></DeleteTopicButton>
                    )
                }
            </TopicContainer>
            <CommentsContainer>
                <h4>Commentaires</h4>
                {comments.map(
                    ({
                        content,
                        _id,
                        creationDate,
                        user_id,
                        nickname,
                        topic_id,
                    }) => {
                        return (
                            // <p key={id}>contient : {content}</p>
                            <Comment
                                content={content}
                                date={creationDate}
                                id={_id}
                                user_id={user_id}
                                key={`${creationDate}+ ${user_id}`}
                                nickname={nickname}
                                topic_id={topic_id}
                            />
                        )
                    }
                )}

                {user !== null && (
                    <SendCommentForm user_id={user.userId} topic_id={topicId} />
                )}
            </CommentsContainer>
        </PageTopicContainer>
    )
}

/* STYLE AND CSS */

const PageTopicContainer = styled.div`
    padding: 5px;
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    flex-direction: column;
`

const TopicContainer = styled.div`
    display: flex;
    justify-content: center;
    align-self: top;
    flex-direction: column;
    border: 1px solid ${colors.primary};
    box-shadow: 0px 0px 1px 1px;
    margin-top: 30px;
    width: 90%;
    max-width: 1200px;
    @media all and (min-width: 900px) {
        width: 80%;
    }
`
const TopicHeaderContainer = styled.div`
    display: flex;
    flex-direction: column-reverse;
    background-color: ${colors.secondary};
    border-bottom: 2px solid ${colors.primary};
    box-shadow: 0px 2px 0px 0px ${colors.primary};
    @media all and (min-width: 650px) {
        flex-direction: column;
    }
`

const TopicTitleStyle = styled.h3`
    font-style: italic;
    text-align: center;
    margin-top: 10px;
`
const PublisherInfosContainer = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: solid 2px ${colors.primary};
    padding: 1%;
    @media all and (min-width: 650px) {
        border-bottom: 0px;
        // flex-direction: column;
    } ;
`
const PublisherAuthorSpan = styled.span`
    font-weight: 600;
    margin-left: 5px;
`
const DescriptionParagraphStyle = styled.p`
    padding: 0.5rem;
`

const CommentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    max-width: 1200px;
    @media all and (min-width: 900px) {
        width: 80%;
    }
`
