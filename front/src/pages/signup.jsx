import styled from "styled-components";
import colors from "../utils/style/colors";
import logo from "../assets/livre_ouvert_violet.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUser } from "../api/api";

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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [nickname, setNickname] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        //use all user information to fetch
        const data = {
            email,
            password,
            firstname,
            lastname,
            nickname,
        };
        console.log(data);

        // call api with data
        createUser(data)
            // and use status to redirect on login if ok
            .then((res) => {
                res.status === 201
                    ? navigate("/login")
                    : console.log(res.status + " en status");
            });
    };

    return (
        <Container>
            <LogoStyle src={logo} alt="logo" />
            <h1>Rejoignez-nous !</h1>
            <FormStyle onSubmit={handleSubmit}>
                <FormInputContainerStyle>
                    <label htmlFor="firstname">Prénom</label>
                    <FormInputStyle
                        id="firstname"
                        onChange={(e) => setFirstname(e.target.value)}
                    ></FormInputStyle>
                </FormInputContainerStyle>
                <FormInputContainerStyle>
                    <label htmlFor="lastname">Nom</label>
                    <FormInputStyle
                        id="lastname"
                        onChange={(e) => setLastname(e.target.value)}
                    ></FormInputStyle>
                </FormInputContainerStyle>
                <FormInputContainerStyle>
                    <label htmlFor="nickname">Pseudo</label>
                    <FormInputStyle
                        id="nickname"
                        onChange={(e) => setNickname(e.target.value)}
                    ></FormInputStyle>
                </FormInputContainerStyle>
                <FormInputContainerStyle>
                    <label htmlFor="email">Email</label>
                    <FormInputStyle
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                    ></FormInputStyle>
                </FormInputContainerStyle>
                <FormInputContainerStyle>
                    <label htmlFor="password">Mot de passe</label>
                    <FormInputStyle
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    ></FormInputStyle>
                </FormInputContainerStyle>
                <FormButtonStyle> Valider l'inscription</FormButtonStyle>
            </FormStyle>
            <p>
                Déjà inscrit? <Link to="/login"></Link>Par ici
            </p>
        </Container>
    );
}

// il faut un champ firstname / lastname / nickname / email / mdp
// un lien de switch vers log in
// un btn valider
