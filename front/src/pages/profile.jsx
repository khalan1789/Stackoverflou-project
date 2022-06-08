import styled from "styled-components"
import colors from "../utils/style/colors"
import logo from "../assets/livre_ouvert_violet.svg"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useState } from "react"
import BackToHomeButton from "../components/buttons/backToHomeButton"
import { ToUpdateProfileButton } from "../components/buttons/toUpdateProfileButton"
import Loading from "../components/loading"

export function Profile() {
    // check user infos from redux
    const user = useSelector((state) => state.user.infos)

    //states for the view
    const [nickname, setNickname] = useState("")
    const [lastname, setLastname] = useState("")
    const [firstname, setFirstname] = useState("")
    const [email, setEmail] = useState("")

    // prepare state for loader
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (user !== null) {
            setIsLoading(true)
            setNickname(user.nickname)
            setLastname(user.lastname)
            setFirstname(user.firstname)
            setEmail(user.email)
            setIsLoading(false)
        }
    }, [user])
    return isLoading ? (
        <Loading />
    ) : (
        <Container>
            <Wrapper>
                <PseudoStyle>{nickname}</PseudoStyle>
                <InfoWrapper>
                    {/*un côté gauche pour la photo et l'autre pour les infos ?*/}
                    <AvatarContainerStyle>
                        <AvatarStyle src={logo} alt="avatar utilisateur" />
                        {/* <ModificationButtonStyle>
                            changer la photo
                        </ModificationButtonStyle> */}
                    </AvatarContainerStyle>
                    <TextInfosContainerStyle>
                        <H3InfosUserStyled>
                            {firstname} {lastname}
                        </H3InfosUserStyled>
                        <H3InfosUserStyled>{email}</H3InfosUserStyled>
                        <ToUpdateProfileButton
                            link={"/profile/update"}
                            text={"Modifier mes informations"}
                        ></ToUpdateProfileButton>
                    </TextInfosContainerStyle>
                </InfoWrapper>
            </Wrapper>
            <BackToHomeButton />
        </Container>
    )
}

/* STYLE AND CSS */

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 10%;
`
const Wrapper = styled.div`
    border: 1px solid ${colors.primary};
    width: 80%;
    display flex;
    flex-direction: column; 
    background-color: ${colors.btnLog};
    border: 2px solid ${colors.primary};
`

const PseudoStyle = styled.h1`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: ${colors.primary};
    color: white;
    // border-bottom: solid 5px ${colors.primary};
    font-style: italic;
    padding-right: 15px;
    margin-top: 0px;
`

const InfoWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    // background-color: ${colors.btnLog};
    @media all and (min-width: 600px) {
        flex-direction: row;
    }
`
const AvatarContainerStyle = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    // background-color: white;
    min-height: 200px;
    @media all and (min-width: 600px) {
        width: 50%;
    }
`
const AvatarStyle = styled.img`
    height: 120px;
    @media all and (min-width: 600px) {
        height: 90px;
    }
`

const TextInfosContainerStyle = styled.div`
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const H3InfosUserStyled = styled.h3`
    color: ${colors.primary};
`
