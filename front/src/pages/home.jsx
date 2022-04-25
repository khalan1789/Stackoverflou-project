import styled from "styled-components"
import colors from "../utils/style/colors"
import { useEffect, useState } from "react"
import { getAllTopic } from "../api/topicApi"
import { ResumeTopic } from "../components/layout/resumeTopic"
import { Link } from "react-router-dom"

export function Home() {
    const [topics, setTopics] = useState([])
    useEffect(() => {
        getAllTopic()
            .then((data) => setTopics(data.topics))
            .catch((error) => console.log(error))
    }, [])

    return (
        <HomeContainer>
            <MainTitleStyled>Bienvenue sur stackoverflou </MainTitleStyled>
            <H3TitleStyled>L'endroit où l'on voit plus net après</H3TitleStyled>

            <PublishLink to="/createTopic">Publier un article</PublishLink>
            <TopicsContainer>
                {topics.map(({ title, description, creationDate, _id }) => {
                    return (
                        <ResumeTopic
                            title={title}
                            date={creationDate}
                            description={description}
                            key={`${title}-${_id}`}
                            id={_id}
                        />
                    )
                })}
            </TopicsContainer>
        </HomeContainer>
    )
}

/* STYLE AND CSS */

const HomeContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 95%;
    padding-left: 2%;
    padding-right: 2%;
    min-height: 100vh;
`
const MainTitleStyled = styled.h1`
    text-align: center;
`

const H3TitleStyled = styled.h3`
    text-align: center;
    margin-bottom: 40px;
`

const PublishLink = styled(Link)`
    border: solid 1px ${colors.primary};
    background-color: ${colors.backgroundLight};
    text-decoration: none;
    width: 200px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    :hover {
        background-color: ${colors.primary};
        color: ${colors.backgroundLight};
        box-shadow: 0px 0px 1px 1px ${colors.primary};
    }
    @media all and (min-width: 650px) {
        margin-bottom: 35px;
    }
`
const TopicsContainer = styled.div`
    width: 100%;
    display: flex;
    // flex-wrap: wrap;
    flex-direction: column;
    // align-items: center;
    // justify-content: center;
    @media all and (min-width: 900px) {
        width: 75%;
    }
    @media all and (min-width: 1600px) {
        width: 65%;
    }
    @media all and (min-width: 2500px) {
        width: 50%;
    }
`
