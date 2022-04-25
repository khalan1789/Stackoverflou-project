import styled from "styled-components"
import colors from "../utils/style/colors"
import erreur404 from "../assets/erreurIngrid.png"
import { Link } from "react-router-dom"

export function Error404() {
    return (
        <ContainerStyle>
            <PageTitle>
                Aïe on voit flou là, nous ne sommes pas au bon endroit
            </PageTitle>
            <ImgStyle src={erreur404} alt="illustration pour erreur 404" />
            <H3Style>
                Ingrid : <StrongStyle>"...ERREUR 404..."</StrongStyle>{" "}
            </H3Style>
            <LinkStyle to="/home">Accueil du site</LinkStyle>
        </ContainerStyle>
    )
}

const ContainerStyle = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: ${colors.btnLog};
    min-height: 100vh;
`
const PageTitle = styled.h2`
    margin: 50px 20px;
    text-align: center;
`

const ImgStyle = styled.img`
    width: 300px;
    margin-bottom: 20px;
    @media all and (min-width: 900px) {
        width: 400px;
    }
    ma
`

const H3Style = styled.h3`
    font-style: bold;
`
const LinkStyle = styled(Link)`
    margin-top: 20px;
    text-decoration: none;
    border: 1px solid ${colors.primary};
    width: 200px;
    text-align: center;
    background-color: ${colors.backgroundLight};
    color: ${colors.primary};
    :hover {
        box-shadow: 0px 0px 2px 1px ${colors.primary};
    }
`
const StrongStyle = styled.strong`
    font-style: italic;
    font-size: 0.6rem;
    color: ${colors.primary};
`
