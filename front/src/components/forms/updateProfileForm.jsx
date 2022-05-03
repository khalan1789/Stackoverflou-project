import styled from "styled-components"
import colors from "../../utils/style/colors"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { useState } from "react"
import { UpdateProfileButton } from "../buttons/updateProfileFormButton"
import { CancelFormButton } from "../buttons/cancelFormButton"
import { updateUserInfos } from "../../api/userApi"
import { updateReduxUserInfos } from "../../store/reducers/userReducer"
import Loading from "../loading"

export function UpdateProfileForm({
    userNickname,
    userLastname,
    userFirstname,
    userId,
}) {
    // states for the component
    const [nickname, setNickname] = useState("")
    const [lastname, setLastname] = useState("")
    const [firstname, setFirstname] = useState("")
    const [id, setId] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    // to update state in redux
    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        setNickname(userNickname)
        setLastname(userLastname)
        setFirstname(userFirstname)
        setId(userId)
        setIsLoading(false)
    }, [userNickname, userLastname, userFirstname, userId])

    // test return when inputs are changed */ to transform in send data */
    function sendUserInfosUpdated(e) {
        e.preventDefault()
        const data = {
            nickname,
            lastname,
            firstname,
        }
        updateUserInfos(id, data)
            .then((res) => {
                //it's ok we update redux state
                dispatch(updateReduxUserInfos(res.data))
                alert("modification du profil enregistrée")
                navigate("/profile") //ici ça mets pas super à jour je trouve
            })
            .catch((error) => console.log(error))
    }
    return isLoading ? (
        <Loading />
    ) : (
        <FormContainer>
            <FormInputContainer>
                <LabelFormStyle htmlFor="nickname">Pseudo</LabelFormStyle>
                <InputFormStyle
                    type="text"
                    id="nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                ></InputFormStyle>
            </FormInputContainer>
            <FormInputContainer>
                <LabelFormStyle htmlFor="lastname">Nom</LabelFormStyle>
                <InputFormStyle
                    type="text"
                    id="lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                ></InputFormStyle>
            </FormInputContainer>
            <FormInputContainer>
                <LabelFormStyle htmlFor="firstname">Prénom</LabelFormStyle>
                <InputFormStyle
                    type="text"
                    id="firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                ></InputFormStyle>
            </FormInputContainer>
            <UpdateProfileButton
                text={"Enregistrer"}
                action={(e) => sendUserInfosUpdated(e)}
            ></UpdateProfileButton>
            <CancelFormButton link={"/profile"} text={"Annuler"} />
        </FormContainer>
    )
}

// style CSS

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    border: 1px solid ${colors.primary};
    width: 80%;
    background-color: ${colors.btnLog};
    border: 2px solid ${colors.primary};
    // min-height: 50vh;
    text-align: center;
    padding: 1%;
    padding-left: 5%;
    padding-right: 5%;
    @media all and (min-width: 650px) {
        width: 70%;
    }
    @media all and (min-width: 950px) {
        width: 600px;
        text-align: center;
    }
`

const FormInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    margin-bottom: 10px;
`
const LabelFormStyle = styled.label`
    color: ${colors.primary};
    font-size: 1.1rem;
    margin-bottom: 10px;
    font-weight: bolder;
`
const InputFormStyle = styled.input`
    font-size: 1rem;
    border: none;
    height: 30px;
    font-weight: bold;
    text-align: center;
`
