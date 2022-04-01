import styled from "styled-components"
import colors from "../../utils/style/colors"

export function Topic() {
    // à prévoir que le composant recoive en paramètre le titre / pseudo / date / et les com associés
    return (
        <TopicContainer>
            <TopicHeaderContainer>
                <TopicTitleStyle>Titre de l'article </TopicTitleStyle>
                <PublisherInfosContainer>
                    <p>Pseudo</p>
                    <p>Date jj/mm/aaaa</p>
                </PublisherInfosContainer>
            </TopicHeaderContainer>

            <p>
                Corps de l'article : Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Voluptatem debitis et nisi quos suscipit
                incidunt eligendi quibusdam animi. Quisquam perspiciatis aperiam
                voluptatum explicabo veniam mollitia dignissimos illum
                cupiditate sunt ratione.
            </p>

            {/* à voir si on met la gestion de pj */}
        </TopicContainer>
    )
}

const TopicContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid ${colors.primary};
    box-shadow: 0px 0px 1px 1px;
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
