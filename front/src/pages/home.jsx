import { useSelector } from "react-redux"
import styled from "styled-components"
import colors from "../utils/style/colors"
import { useEffect, useState } from "react"
import { getAllTopic } from "../api/topicApi"
import { ResumeTopic } from "../components/layout/resumeTopic"
import { useNavigate, Link } from "react-router-dom"

export function Home() {
    const user = useSelector((state) => state.user.infos)
    const isLoged = useSelector((state) => state.user.isLogged)

    const [topics, setTopics] = useState([])
    useEffect(() => {
        getAllTopic()
            .then((data) => setTopics(data.topics))
            .catch((error) => console.log(error))
    }, [])

    return (
        <HomeContainer>
            <p>
                Je vois : {user === null ? "personne connecté" : user.nickname}/
                log : {isLoged ? "il est là" : "non pas connect"}
            </p>
            {/* <button onClick={logOut}>Se déconnecter</button> */}
            <MainTitleStyled>Bienvenue sur stackoverflou </MainTitleStyled>
            <H3TitleStyled>L'endroit où l'on voit plus net après</H3TitleStyled>

            <Link to="/createTopic">Publier un article</Link>
            <div>
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
            </div>
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
`
const MainTitleStyled = styled.h1`
    text-align: center;
`

const H3TitleStyled = styled.h3`
    text-align: center;
`
