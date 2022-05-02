import { Link } from "react-router-dom"
import styled from "styled-components"
import colors from "../../utils/style/colors"
import editDate from "../../utils/helper/editDate"

export function ResumeTopic({ title, date, id, author }) {
    // const [initialDate, setInitialDate] = useState()
    // setInitialDate(date)
    const editedDate = editDate(date)
    // async function transformDate(dateToTransform) {
    //     const newDate = editDate(dateToTransform)
    //     return newDate // bloqué ici à voir pour utiliser un state là
    // }

    // const initialDate = transformDate(date)
    return (
        <TopicContainer>
            <TopicHeaderContainer>
                <TopicTitleStyle>{title} </TopicTitleStyle>
                <PublisherInfosContainer>
                    <PublisherParagraph>
                        Posté par{" "}
                        <PublisherAuthorSpan>{author}</PublisherAuthorSpan>
                    </PublisherParagraph>
                    <PublisherParagraph>{editedDate} </PublisherParagraph>
                </PublisherInfosContainer>
            </TopicHeaderContainer>
            <LinkStyle to={"/topic/?id=" + id}>Voir l'article</LinkStyle>
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
    // max-width: 750px;
    width: 100%;
`
const TopicHeaderContainer = styled.div`
    display: flex;
    flex-direction: column-reverse;
    background-color: ${colors.secondary};
    border-bottom: 2px solid ${colors.primary};
    box-shadow: 0px 2px 0px 0px ${colors.primary};
    @media all and (min-width: 650px) {
        justify-content: space-between;
        flex-direction: column;
    } ;
`

const TopicTitleStyle = styled.h3`
    font-style: italic;
    min-height: 50%;
    margin-left: 10px;
    margin-right: 5px;
    // padding-left: 20px;
    // text-align: center;
    // justify-content: center;
    // margin-left: 5px;
    // margin-right: 5px;
    // flex-wrap: wrap;
    // display: flex;
    @media all and (min-width: 650px) {
        width: 100%;
        align-self: center;
        padding-left: 20px;
    }
`
const PublisherInfosContainer = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: solid 2px ${colors.primary};
    padding: 1%;
    @media all and (min-width: 650px) {
        border-bottom: 0px;
    } ;
`
const PublisherParagraph = styled.p`
    font-style: italic;
`
const PublisherAuthorSpan = styled.span`
    font-weight: 600;
`
const LinkStyle = styled(Link)`
    text-align: center;
    text-decoration: none;
    background-color: ${colors.primary};
    color: ${colors.secondary};
    :hover {
        background-color: ${colors.btnProfile};
        font-weight: bold;
    }
`
