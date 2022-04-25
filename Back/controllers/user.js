const User = require("../models/user");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

require("dotenv").config();
const secretToken = process.env.secretToken;

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
            email: req.body.email,
            password: hash,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            nickname: req.body.nickname,
            creationDate: new Date(),
        });
        // use save method from mongoose
        user.save()
            .then(() =>
                res.status(201).json({
                    message: "Utilisateur créé avec succès !",
                })
            )
            .catch((error) => res.status(500).json({ error }));
    });
};

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({
                    // status: 401,
                    error: "User not found !",
                });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            // status: 401,
                            message: "Invalid password !",
                        });
                    }
                    res.status(202).json({
                        // à remettre en status 200 quand tout sera ok niveau front
                        token: jwt.sign({ userId: user._id }, secretToken, {
                            expiresIn: "24h",
                        }),
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

// to control the token
exports.checkToken = (req, res) => {
    const id = req.body._id;
    console.log("id req : " + id);
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
                    },
                },
            });
        })
        .catch((error) => console.log(error));
};

// token is checked, get the user

exports.getOneUser = (req, res) => {
    const id = req.body._id;
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
            });
        })
        .catch((error) => console.log(error));
};

// update user infos
exports.updateOneUser = (req, res) => {
    const id = req.body._id;
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
            });
        })
        .catch((error) => console.log("error update user : " + error));
};
