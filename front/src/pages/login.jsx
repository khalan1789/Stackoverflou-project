import styled from "styled-components";
import colors from "../utils/style/colors";
import logo from "../assets/livre_ouvert_violet.svg";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const LogoStyle = styled.img`
    height: 50px;
    margin-top: 80px;
`;

const FormStyle = styled.form`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    box-shadow: 0px 0px 4px 2px ${colors.backgroundLight};
    border-radius: 5px;
    min-width: 280px;
    padding: 10px;
    min-height: 30vh;
`;

const FormInputContainerStyle = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
`;

const FormInputStyle = styled.input`
    display: flex;

    margin-top: 7px;
    height: 30px;
    padding: 2px;
`;

const FormButtonStyle = styled.button`
    background-color: ${colors.backgroundLight};
    color: white;
    border-radius: 5px;
    height: 30px;
`;

export function LogIn() {
    return (
        <Container>
            <LogoStyle src={logo} alt="logo" />
            <h1>Connectez vous !</h1>
            <FormStyle>
                <FormInputContainerStyle>
                    <label for="email">Email</label>
                    <FormInputStyle
                        id="email"
                        placeholder="entrez votre email ici"
                    ></FormInputStyle>
                </FormInputContainerStyle>
                <FormInputContainerStyle>
                    <label for="password">Mot de passe</label>
                    <FormInputStyle
                        id="password"
                        placeholder="entrez votre mot de passe ici"
                    ></FormInputStyle>
                </FormInputContainerStyle>
                <FormButtonStyle>Log in</FormButtonStyle>
            </FormStyle>
            <p>Pas encore de compte ? inscrivez-vous</p>
        </Container>
    );
}

// // L'idée : centrer le composant au centre
//  - avec un champ email
//  - avec un champ mdp
//  - un changer de page en lien dessous
//   -un btn se connecter
