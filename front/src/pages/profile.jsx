import styled from "styled-components";
import colors from "../utils/style/colors";
import logo from "../assets/livre_ouvert_violet.svg";
import { Link } from "react-router-dom";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const Wrapper = styled.div`
    border: 1px solid ${colors.primary};
    width: 80%;
    display flex;
    flex-direction: column; 
`;

const PseudoStyle = styled.h1`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: ${colors.primary};
    color: white;
    font-style: italic;
    padding-right: 15px;
`;

const InfoWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    @media all and (min-width: 600px) {
        flex-direction: row;
    }
`;
const AvatarContainerStyle = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    background-color: yellow;
    min-height: 200px;
    @media all and (min-width: 600px) {
        width: 50%;
    }
`;
const AvatarStyle = styled.img`
    height: 120px;
    @media all and (min-width: 600px) {
        height: 90px;
    }
`;

const TextInfosContainerStyle = styled.div`
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ModificationButtonStyle = styled.button`
    margin-bottom: 15px;
    margin-top: 10px;
    border: 1px solid ${colors.primary};
    background-color: ${colors.primary};
    color: white;
    border-radius: 5%;
`;

const BackButtonStyle = styled(Link)`
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 25px;
    padding: 3px;
    border: 1px solid ${colors.primary};
    // background-color: ${colors.secondary};
    color: dark;
    border-radius: 2%;
    :hover {
        cursor: pointer;
        box-shadow: 0px 0px 1px 1px ${colors.primary};
    }
`;
export function Profile() {
    return (
        <Container>
            <Wrapper>
                <PseudoStyle>
                    Pseudonyme
                    {/*ici on va mettre le pseudo en haut du bandeau de l'onglet */}
                </PseudoStyle>
                <InfoWrapper>
                    {/*un côté gauche pour la photo et l'autre pour les infos ?*/}
                    <AvatarContainerStyle>
                        <AvatarStyle src={logo} alt="avatar utilisateur" />
                        <ModificationButtonStyle>
                            changer la photo
                        </ModificationButtonStyle>
                    </AvatarContainerStyle>
                    <TextInfosContainerStyle>
                        <h3>Name</h3>
                        <h3>firstname</h3>
                        <h3>email</h3>
                        <h3>password</h3>
                        <ModificationButtonStyle>
                            Modifier mes informations
                        </ModificationButtonStyle>
                    </TextInfosContainerStyle>
                </InfoWrapper>
            </Wrapper>
            <BackButtonStyle to="/">Retour à l'acceuil</BackButtonStyle>
        </Container>
    );
}

/* zone pour passage en mode mobile first

// info
const InfoWrapper = styled.div`
    display: flex;
    width: 100%;


const AvatarContainerStyle = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    background-color: yellow;


*/