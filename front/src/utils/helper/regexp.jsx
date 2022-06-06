// here is the logic of all regexp and field controls

const regexpEmail = /^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,8}$/
const regexFields = /^[A-Za-z- éè^ïö]+$/
const regexPassword = /^[A-Za-z- _1-9.éè^@!/]{8,}$/
const regexpNickname = /^[A-Za-z0-9- éè^ïö]+$/

// to login
export function validateLogInFiedls(email, password) {
    if (
        regexpEmail.test(email) !== true ||
        regexFields.test(password) !== true ||
        (email === "" && password === "")
    ) {
        return false
    } else {
        return true
    }
}

// to signup
export function validateCreateUserFields(
    firstname,
    lastname,
    nickname,
    email,
    password
) {
    if (
        regexFields.test(firstname) !== true ||
        regexFields.test(lastname) !== true ||
        regexpNickname.test(nickname) !== true ||
        regexPassword.test(password) !== true ||
        regexpEmail.test(email) !== true ||
        firstname === "" ||
        lastname === "" ||
        nickname === "" ||
        email === "" ||
        password === ""
    ) {
        return false
    } else {
        return true
    }
}

// to update password
export function validateUpdatePasswordFields(password) {
    if (regexPassword.test(password) !== true) {
        return false
    } else {
        return true
    }
}
