import { useEffect, useState } from "react"
import styled from "styled-components"
import { getOneTopic } from "../api/topicApi"
import editDate from "../utils/helper/editDate"
import colors from "../utils/style/colors"

export function Topic() {
    // search id in the url
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")

    // prepare states for the topic
    const [topic, setTopic] = useState({})
    const [topicDate, setTopicDate] = useState()

    // call api using id
    useEffect(() => {
        // const params = new URLSearchParams(window.location.search)
        // const id = params.get("id")
        console.log("hello use effect " + id)
        getOneTopic(id)
            .then((topicInfos) => {
                setTopic(topicInfos)

                // transforming date
                setTopicDate(editDate(topicInfos.creationDate))
            })
            .catch((error) => console.log("erreur > " + error))
    }, [id])

    // à prévoir que le composant recoive en paramètre le titre / pseudo / date / et les com associés
    return (
        <TopicContainer>
            <TopicHeaderContainer>
                <TopicTitleStyle>{topic.title}</TopicTitleStyle>
                <PublisherInfosContainer>
                    {/* <p>Posté le : {editDate()}</p> */}
                    <p>id c'est : {topic._id}</p>
                </PublisherInfosContainer>
            </TopicHeaderContainer>
            {/* <p>Date split : {() => date.reverse()}</p> */}
            <p>{topic.description}</p>
            <p>{topic.creationDate}</p>
            <p>Posté le : {topicDate}</p>
            {/* à voir si on met la gestion de pj */}
        </TopicContainer>
    )
}

/* STYLE AND CSS */

const TopicContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid ${colors.primary};
    box-shadow: 0px 0px 1px 1px;
    margin-top: 30px;
`
const TopicHeaderContainer = styled.div`
    display: flex;
    flex-direction: column-reverse;
    background-color: ${colors.secondary};
    border-bottom: 2px solid ${colors.primary};
    box-shadow: 0px 2px 0px 0px ${colors.primary};
    @media all and (min-width: 650px) {
        justify-content: space-between;
        flex-direction: row;
    } ;
`

const TopicTitleStyle = styled.h3`
    font-style: italic;
    border: solid 1px black;
    min-height: 50%;
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
