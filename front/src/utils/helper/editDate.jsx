// global function to transform any date came received from back-end

export default function editDate(date) {
    const splitedDate = date.split("T")[0]
    const editedDate = splitedDate.split("-").reverse().join("/")
    return editedDate
}
