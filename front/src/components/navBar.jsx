import styled from "styled-components";
import colors from "../utils/style/colors";
import mainLogo from "../assets/livre_ouvert_jaune.svg";

const NavStyle = styled.nav`
    display: flex;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: ${colors.backgroundLight};
`;
const LogoImgStyled = styled.img`
    height: 30px;
    margin-right: 20px;
`;

const LogoTitleStyled = styled.p`
    color: ${colors.secondary};
    display: flex;
    font-size: 1.2rem;
`;

const UlStyle = styled.ul`
    display: flex;
    margin-right: 10px;
`;

const NavBarBtnLog = styled.button`
    border: 1px solid ${colors.btnLog};
    height: 35px;
    min-width: 60px;
    margin-right: 10px;
    background-color: ${colors.btnLog};
    box-shadow: 0px 0px 1px 1px ${colors.btnLog};
    color: ${colors.backgroundLight};
    :hover {
        box-shadow: 0px 0px 3px 2px ${colors.btnLog};
        cursor: pointer;
    }
`;

const NavBarBtnSign = styled.button`
    border: 1px solid ${colors.btnSign};
    height: 35px;
    min-width: 60px;
    margin-right: 10px;
    background-color: ${colors.btnSign};
    box-shadow: 0px 0px 1px 1px ${colors.btnSign};
    color: ${colors.backgroundLight};
    :hover {
        box-shadow: 0px 0px 3px 2px ${colors.btnSign};
        cursor: pointer;
    }
`;

export function NavBar() {
    return (
        <NavStyle>
            <LogoTitleStyled>
                <LogoImgStyled src={mainLogo} alt="logo stackoverflou" />{" "}
                StackOverFlou
            </LogoTitleStyled>
            <UlStyle>
                <NavBarBtnLog background-color={colors.secondary}>
                    Log in
                </NavBarBtnLog>
                <NavBarBtnSign>Sign up</NavBarBtnSign>
            </UlStyle>
        </NavStyle>
    );
}

export default NavBar;
