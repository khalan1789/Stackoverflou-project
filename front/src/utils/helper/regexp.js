// here is the logic of all regexp and field controls

const regexpEmail = /^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,8}$/
const regexFields = /^[A-Za-z- éè^ïö]+$/
const regexNickName = /^[A-Za-z- _1-9.éè^ïö]+$/
const regexPassword = /^[A-Za-z- _1-9.éè^@!/]{8,}$/ // FIX

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
        regexFields.test(nickname) !== true ||
        regexFields.test(password) !== true ||
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

// to update password FIX
export function validateUpdatePasswordFields(password) {
    if (regexPassword.test(password) !== true) {
        return false
    } else {
        return true
    }
}