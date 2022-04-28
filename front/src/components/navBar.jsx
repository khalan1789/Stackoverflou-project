import styled from "styled-components"
import colors from "../utils/style/colors"
import mainLogo from "../assets/livre_ouvert_jaune.svg"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logOutUser } from "../store/reducers/userReducer"

export function NavBar() {
    const isLogged = useSelector((state) => state.user.isLogged)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function logOut() {
        dispatch(logOutUser()) // à voir pour sortir la logique dans un autre fichier
        localStorage.removeItem("stack-overflou-token")
        navigate("/login")
    }
    return (
        <NavStyle>
            <LogoTitleStyled to="/home">
                <LogoImgStyled src={mainLogo} alt="logo stackoverflou" />
                StackOverFlou
            </LogoTitleStyled>
            <UlStyle>
                {isLogged === true ? (
                    <>
                        <NavBarBtnProfile to="/profile">
                            Mon profil
                        </NavBarBtnProfile>

                        <NavBarBtnLogOut onClick={() => logOut()}>
                            Déconnexion
                        </NavBarBtnLogOut>
                    </>
                ) : (
                    <>
                        <NavBarBtnLog to="/login">Log in</NavBarBtnLog>
                        <NavBarBtnSign to="/signup">Sign up</NavBarBtnSign>
                    </>
                )}
            </UlStyle>
        </NavStyle>
    )
}

/* STYLE AND CSS */

const NavStyle = styled.nav`
    display: flex;
    align-items: center;
    background-color: ${colors.primary};
    flex-direction: column;
    @media all and (min-width: 600px) {
        height: 40px;
        justify-content: space-between;
        padding: 10px;
        flex-direction: row;
    }
    @media all and (min-width: 2450px) {
        padding-left: 13%;
        padding-right: 13%;
    }
`
const LogoImgStyled = styled.img`
    height: 30px;
    margin-right: 20px;
`

const LogoTitleStyled = styled(Link)`
    color: ${colors.secondary};
    display: flex;
    font-size: 1.2rem;
    text-decoration: none;
`

const UlStyle = styled.ul`
    display: flex;
    margin-right: 10px;
    flex-direction: column;
    @media all and (min-width: 600px) {
        flex-direction: row;
    }
`

const NavBarBtnLog = styled(Link)`
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${colors.btnLog};
    height: 35px;
    min-width: 60px;
    margin-right: 10px;
    background-color: ${colors.btnLog};
    box-shadow: 0px 0px 1px 1px ${colors.btnLog};
    color: ${colors.primary};
    :hover {
        box-shadow: 0px 0px 3px 2px ${colors.btnLog};
        cursor: pointer;
    }
`

const NavBarBtnSign = styled(Link)`
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${colors.btnSign};
    height: 35px;
    min-width: 100px;
    margin-right: 10px;
    margin-top: 20px;
    background-color: ${colors.btnSign};
    box-shadow: 0px 0px 1px 1px ${colors.btnSign};
    color: ${colors.primary};
    :hover {
        box-shadow: 0px 0px 3px 2px ${colors.btnSign};
        cursor: pointer;
    }
    @media all and (min-width: 600px) {
        min-width: 60px;
        margin-top: auto;
    }
`
const NavBarBtnProfile = styled(Link)`
    padding: 0px 1px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${colors.btnLog};
    height: 35px;
    min-width: 60px;
    margin-right: 10px;
    background-color: white;
    box-shadow: 0px 0px 1px 1px ${colors.btnLog};
    color: ${colors.primary};
    margin-bottom: 20px;
    :hover {
        box-shadow: 0px 0px 3px 2px ${colors.btnLog};
        cursor: pointer;
    }
    @media all and (min-width: 600px) {
        min-width: 60px;
        margin-bottom: auto;
    }
`

const NavBarBtnLogOut = styled.button`
    padding: 1px 2px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${colors.secondary};
    height: 35px;
    min-width: 60px;
    margin-right: 10px;
    background-color: transparent;
    // box-shadow: 0px 0px 1px 1px ${colors.btnLog};
    color: ${colors.secondary};
    :hover {
        box-shadow: 0px 0px 3px 2px ${colors.btnLog};
        cursor: pointer;
    }
    // padding: 1px 2px;
    // text-decoration: none;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // border: 1px solid ${colors.btnLog};
    // height: 35px;
    // min-width: 60px;
    // margin-right: 10px;
    // background-color: white;
    // box-shadow: 0px 0px 1px 1px ${colors.btnLog};
    // color: ${colors.primary};
    // margin-bottom: 20px;
    // :hover {
    //     box-shadow: 0px 0px 3px 2px ${colors.btnLog};
    //     cursor: pointer;
    // }
    // @media all and (min-width: 600px) {
    //     min-width: 60px;
    //     margin-bottom: auto;
    // }
`

export default NavBar
