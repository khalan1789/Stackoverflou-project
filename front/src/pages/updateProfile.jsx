import styled from "styled-components"
import colors from "../utils/style/colors"
import logo from "../assets/livre_ouvert_violet.svg"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useState } from "react"
import { UpdateProfileForm } from "../components/forms/updateProfileForm"

export function UpdateProfile() {
    // get user infos
    const user = useSelector((state) => state.user.infos)

    //prepare states for this component
    const [nickname, setNickname] = useState("")
    const [lastname, setLastname] = useState("")
    const [firstname, setFirstname] = useState("")
    const [userId, setUserId] = useState("")
    useEffect(() => {
        if (user !== null) {
            setNickname(user.nickname)
            setLastname(user.lastname)
            setFirstname(user.firstname)
            setUserId(user.userId)
        }
    }, [user])

    return (
        <Container>
            {/* <CancelButton link={"/home"} /> */}
            <h2>Des choses à modifier ?</h2>
            <UpdateProfileForm
                userNickname={nickname}
                userLastname={lastname}
                userFirstname={firstname}
                userId={userId}
            />
            {/* <form>
                <div>
                    <label>Pseudo</label>
                    <input></input>
                </div>
                <div>
                    <label>Nom</label>
                    <input></input>
                </div>
                <div>
                    <label>Prénom</label>
                    <input></input>
                </div>
                <button>enregistrer</button>
            </form> */}
            {/* <button>Modifier le mot de passe</button> */}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 30px;
    min-height: 80vh;
    @media all and (min-width: 650px) {
        min-height: 85vh;
        margin-top: 3%;
    }
    @media all and (min-width: 1500px) {
        min-height: 95vh;
        margin-top: 3%;
    }
`
