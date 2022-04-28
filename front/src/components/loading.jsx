import styled from "styled-components"
// import { Loader } from "../layout/Loader"
import colors from "../utils/style/colors"
import { Loader } from "./layout/loader"

// function part
export default function Loading() {
    return (
        <ContainerStyle>
            <LoaderWrapper>
                <TitleStyle>Chargement</TitleStyle>
                <Loader></Loader>
            </LoaderWrapper>
        </ContainerStyle>
    )
}

// style part
const ContainerStyle = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
`

const LoaderWrapper = styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const TitleStyle = styled.h1`
    color: ${colors.primary};
    font-style: italic;
`
