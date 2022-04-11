import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { TopicFormButton } from "../components/buttons/topicFromButton"
// import { createTopic } from "../../api/topicApi"
import colors from "../utils/style/colors"

export function CreateTopic() {
    // data to send
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    async function FormSubmit(e) {
        const userId = useSelector((state) => state.user.infos.userId)
        e.preventDefault()
        const data = {
            userId,
            title,
            description,
        }

        console.log("id : " + data.userId)
        console.log("title : " + data.title)
        console.log("description : " + data.description)
        // try {
        //     createTopic(data)
        //         .then((response) =>
        //             console.log("status suite post " + response.status)
        //         )
        //         .catch((error) => console.log(error))
        //     setDescription("")
        //     setTitle("")
        //     document.getElementById("Description").value = ""
        //     document.getElementById("Title").value = ""
        // } catch {
        //     console.log("erreur de post")
        // }
        // createTopic(data)

        setDescription("")
        setTitle("")
        document.getElementById("Description").value = ""
        document.getElementById("Title").value = ""
    }

    return (
        <FormContainerStyle>
            <TitleStyle>Publication d'un article</TitleStyle>
            <FormStyle onSubmit={FormSubmit}>
                <FormInputContainerStyle>
                    <FormLabelStyle htmlFor="Title">
                        Titre de l'article
                    </FormLabelStyle>
                    <FormInputTextStyle
                        type="text"
                        id="Title"
                        required
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
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormInputContainerStyle>
                <TopicFormButton text={"Publier"}></TopicFormButton>
                <FormCancelLink>Annuler</FormCancelLink>
            </FormStyle>
        </FormContainerStyle>
    )
}

/* STYLE AND CSS */

const FormContainerStyle = styled.div`
    border: 1px solid green;
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
    border: 1px solid pink;
    display: flex;
    flex-direction: column;
    width: 90%;
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
