const User = require("../models/user")
const Token = require("../models/token")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const sendEmail = require("../utils/sendEmail")
require("dotenv").config()
const clientURL = process.env.client_url

// tokens
const secretToken = process.env.SECRET_TOKEN
const resetToken = process.env.RESET_TOKEN

// template
const template = require("../utils/templateEmail.handlebars")
const user = require("../models/user")

// Regexp
const regexpEmail = /^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,8}$/
const regexFields = /^[A-Za-z- éè^ïö]{2,}$/
const regexPassword = /^[A-Za-z- _1-9.éè^@!/]{8,}$/
const regexpNickname = /^[A-Za-z0-9- éè^ïö]{2,}$/

exports.signup = async (req, res) => {
    // first check inputs sended
    const email = req.body.email
    const password = req.body.password
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const nickname = req.body.nickname
    if (!email || !password || !firstname || !lastname || !nickname) {
        return res
            .status(400)
            .json({ error: " invalid fields or not complete !!!" })
    } else if (
        // fields are all ok ?
        regexpEmail.test(email) !== true ||
        regexPassword.test(password) !== true ||
        regexFields.test(firstname) !== true ||
        regexFields.test(lastname) !== true ||
        regexpNickname.test(nickname) !== true
    ) {
        return res.status(400).json({
            message: " One or more fiels are invalid",
        })
    } else {
        // check if user already exist
        const existingUser = await User.findOne({ email: req.body.email })
        if (existingUser) {
            return res.status(401).json({
                message: "Error ! user already exist !",
            })
        } else {
            bcrypt.hash(req.body.password, 10).then((hash) => {
                const user = new User({
                    email: req.body.email,
                    password: hash,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    nickname: req.body.nickname,
                    creationDate: new Date(),
                    isAdmin: false,
                })
                // use save method from mongoose
                user.save()
                    .then(() =>
                        res.status(201).json({
                            message: "Utilisateur créé avec succès !",
                        })
                    )
                    .catch((error) => res.status(500).json({ error }))
            })
        }
    }
}

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({
                    // status: 401,
                    message: "Utilisateur non trouvé !",
                })
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            // status: 401,
                            message: "Le mot de passe saisie est incorrect !",
                        })
                    }
                    res.status(200).json({
                        // à remettre en status 200 quand tout sera ok niveau front
                        token: jwt.sign({ userId: user._id }, secretToken, {
                            expiresIn: "24h",
                        }),
                    })
                })
                .catch((error) => res.status(500).json({ error }))
        })
        .catch((error) => res.status(500).json({ error }))
}

// to control the token
exports.checkToken = (req, res) => {
    const id = req.body._id
    console.log("id req : " + id)
    User.findById(id)
        .then((user) => {
            res.json({
                status: 200,
                data: {
                    msg: "token valid",
                    userInfos: {
                        userId: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        nickname: user.nickname,
                        email: user.email,
                        creationDate: user.creationDate,
                        isAdmin: user.isAdmin,
                    },
                },
            })
        })
        .catch((error) => console.log(error))
}

// token is checked, get the user

exports.getOneUser = (req, res) => {
    const id = req.body._id
    User.findById(id)
        .then((user) => {
            res.status(200).json({
                data: {
                    userId: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    nickname: user.nickname,
                    email: user.email,
                    creationDate: user.creationDate,
                },
            })
        })
        .catch((error) => console.log(error))
}

// update user infos
exports.updateOneUser = (req, res) => {
    const id = req.body._id
    User.findOneAndUpdate(
        { _id: id },
        {
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            nickname: req.body.nickname,
            _id: id,
        }
    )
        .then((user) => {
            res.status(201).json({
                data: {
                    userId: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    nickname: user.nickname,
                    email: user.email,
                    creationDate: user.creationDate,
                },
            })
        })
        .catch((error) => console.log("error update user : " + error))
}

exports.deleteOneUser = (req, res) => {
    const id = req.body._id
    User.findOneAndDelete({ _id: id })
        .then(() => res.status(200).json({ message: "success user delete" }))
        .catch((error) => {
            throw error
        })
}

exports.forgotPassword = async (req, res) => {
    try {
        const email = await req.body.email

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "email non trouvé !" })
        }
        // update user with the new password
        // check if there is already a token for the user and deleteIt
        let token = await Token.findOne({ userId: user._id })
        if (token) {
            await token.deleteOne()
        }

        // we send a token for reset with a random token
        let resetToken = crypto.randomBytes(32).toString("hex")

        // we create a new Token based on model that we'll send to storage
        const hash = await bcrypt.hash(resetToken, 10)

        await new Token({
            userId: user._id,
            token: hash,
            createdAt: Date.now(),
        }).save()

        // we prepare the link user will received with the token and id
        const link = `${clientURL}/updatepassword?token=${resetToken}&id=${user._id}`

        // send email with infos
        await sendEmail(
            user.email,
            "Réinitialisation du mot de passe",
            { name: user.nickname, link: link },
            "./../utils/templateEmail.handlebars"
        )

        return res
            .status(200)
            .json({ message: " demmande de réinitialisation effectuée" })
    } catch (error) {
        return error
    }
}

exports.updatePassword = async (req, res) => {
    try {
        const token = req.body.token
        const userId = req.body.userId
        const newPassword = req.body.password

        // check if all data needed are in the request
        if (!token || !userId || !newPassword) {
            return res
                .status(400)
                .json({ message: "non authorisé, un élément est manquant" })
        }
        // now we check if there is well a token for this user
        let resetPasswordToken = await Token.findOne({ userId })
        if (!resetPasswordToken) {
            return res.status(400).json({ message: "Token invalide ou expiré" })
        }
        // there is a token, now we will check if it's good
        const isValid = await bcrypt.compare(token, resetPasswordToken.token)
        if (!isValid) {
            return res.status(400).json({ message: "Token invalide ou expiré" })
        }

        const hash = await bcrypt.hash(newPassword, 10)

        await user.updateOne(
            { _id: userId },
            {
                password: hash,
            },
            { new: true }
        )
        await resetPasswordToken.deleteOne()
        return res.status(201).json({ message: "user updated" })
    } catch (error) {
        return res.status(500).json({ problème: error })
    }
}
