import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { updateTopic } from "../api/topicApi"
import { TopicFormButton } from "../components/buttons/topicFormButton"
import PublishFailedAction from "../components/layout/publishFailed"
import { getOneTopic } from "../api/topicApi"
import colors from "../utils/style/colors"
import CancelButton from "../components/buttons/cancelButton"
import Loading from "../components/loading"

export function UpdateTopic() {
    const navigate = useNavigate()

    // on download
    // search id in the url
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")

    // states for the component
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const user = useSelector((state) => state.user.infos)
    const [isLoading, setIsLoading] = useState(false)

    // on downloading we update states with topic infos
    useEffect(() => {
        if (user !== null) {
            setIsLoading(true)
            getOneTopic(id)
                .then((topic) => {
                    setTitle(topic.title)
                    setDescription(topic.description)
                    setIsLoading(false)
                })
                .catch((error) => console.log(error))
        }
    }, [user, id])

    //to alert user if an error occured
    const [publishFailed, setPublishFailed] = useState(false)

    // to delete inputs
    function backToTopic() {
        navigate(`/topic/?id=${id}`)
    }

    function FormSubmit(e) {
        e.preventDefault()
        // get all infos needed to update
        const data = {
            user_id: user.userId,
            title,
            description,
        }

        // update and check response
        updateTopic(id, data)
            .then((res) =>
                res.status === 201
                    ? (window.alert("article modifié avec succès !"),
                      navigate(`/topic/?id=${id}`))
                    : setPublishFailed(true)
            )
            .catch((err) => console.log(err))
    }

    return isLoading ? (
        <Loading />
    ) : (
        <FormContainerStyle>
            <HeaderStyle>
                <CancelButton link={`/topic/?id=${id}`}>X</CancelButton>
                <TitleStyle>Quelque chose à modifier ?</TitleStyle>
            </HeaderStyle>

            <FormStyle onSubmit={FormSubmit}>
                {publishFailed === true ? <PublishFailedAction /> : ""}
                <FormInputContainerStyle>
                    <FormLabelStyle htmlFor="Title">
                        Titre de l'article
                    </FormLabelStyle>
                    <FormInputTextStyle
                        type="text"
                        id="Title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </FormInputContainerStyle>
                <FormInputContainerStyle>
                    <FormLabelStyle htmlFor="Description">
                        Description
                    </FormLabelStyle>
                    <FormInputTextarea
                        id="Description"
                        minLength={5}
                        required
                        wrap="soft"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormInputContainerStyle>
                <TopicFormButton
                    text={"Enregistrer les modifications"}
                ></TopicFormButton>
                <FormCancelLink onClick={() => backToTopic()}>
                    Annuler les modifications
                </FormCancelLink>
            </FormStyle>
        </FormContainerStyle>
    )
}

/* STYLE AND CSS */

const FormContainerStyle = styled.div`
    display: flex;
    flex-direction: column;
    // width: 100%;
    align-items: center;
    margin-top: 30px;
    min-height: 100vh;
`
const TitleStyle = styled.h2`
    text-align: center;
`

const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 900px;
`
const FormInputContainerStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 20px;
`
const FormInputTextarea = styled.textarea`
    resize: none;
    min-height: 350px;
    font-size: 1rem;
    border-color: ${colors.btnProfile};
`
const FormLabelStyle = styled.label`
    font-size: 1.1rem;
    margin-bottom: 10px;
`

const FormInputTextStyle = styled.input`
    font-size: 1rem;
    border-color: ${colors.primary};
    // border: thick double ${colors.primary};
    // border: 1mm ridge ${colors.primary};
`
const FormCancelLink = styled.button`
    background-color: ${colors.btnLog};
    color: ${colors.primary};
    border-color: none;
    border-radius: 5px;
    height: 30px;
    margin-bottom: 15px;
    :hover {
        cursor: pointer;
        // background-color: ${colors.backgroundBase};
        border: none;
        box-shadow: 0px 0px 1px 2px ${colors.primary};
    }
`
// cancel link
// const CancelButton = styled(Link)`
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     align-self: end;
//     width: 50px;
//     height: 50px;
//     margin-right: 25px;
//     margin-bottom: 15px;
//     border: solid 1px ${colors.primary};
//     background-color: ${colors.backgroundLight};
//     color: ${colors.primary};
//     text-decoration: none;
//     border-radius: 50%;
//     :hover {
//         cursor: pointer;
//         background-color: ${colors.primary};
//         color: ${colors.backgroundLight};
//         font-weight: bold;
//     }
//     @media all and (min-width: 1000px) {
//         margin-right: 30px;
//     }
//     @media all and (min-width: 1250px) {
//         height: 40px;
//         width: 40px;
//         // margin-right: 10%;
//     }

// header on the top of the form
const HeaderStyle = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1200px;
`
