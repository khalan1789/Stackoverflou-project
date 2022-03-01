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
    margin-top: 10px;
`;

const FormStyle = styled.form`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    box-shadow: 0px 0px 4px 2px ${colors.backgroundLight};
    border-radius: 5px;
    min-width: 280px;
    padding: 10px;
`;

const FormButtonStyle = styled.button`
    background-color: ${colors.backgroundLight};
    color: white;
    border-radius: 5px;
    height: 30px;
`;

const FormInputContainerStyle = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10px;
`;

const FormInputStyle = styled.input`
    display: flex;
    height: 25px;
    padding: 1px;
`;

export function SignUp() {
    return (
        <Container>
            <LogoStyle src={logo} alt="logo" />
            <h1>Rejoignez-nous !</h1>
            <FormStyle>
                <FormInputContainerStyle>
                    <label for="firstname">Prénom</label>
                    <FormInputStyle id="firstname"></FormInputStyle>
                </FormInputContainerStyle>
                <FormInputContainerStyle>
                    <label for="lastname">Nom</label>
                    <FormInputStyle id="lastname"></FormInputStyle>
                </FormInputContainerStyle>
                <FormInputContainerStyle>
                    <label for="nickname">Pseudo</label>
                    <FormInputStyle id="nickname"></FormInputStyle>
                </FormInputContainerStyle>
                <FormInputContainerStyle>
                    <label for="email">Email</label>
                    <FormInputStyle id="email"></FormInputStyle>
                </FormInputContainerStyle>
                <FormInputContainerStyle>
                    <label for="password">Mot de passe</label>
                    <FormInputStyle id="password"></FormInputStyle>
                </FormInputContainerStyle>
                <FormButtonStyle> Valider l'inscription</FormButtonStyle>
            </FormStyle>
            <p>Déjà inscrit? Par ici</p>
        </Container>
    );
}

// il faut un champ firstname / lastname / nickname / email / mdp
// un lien de switch vers log in
// un btn valider
