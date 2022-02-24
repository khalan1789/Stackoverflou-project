const User = require("../models/user");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
            email: req.body.email,
            password: hash,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            nickname: req.body.nickname,
            creationDate: req.body.creationDate,
        });
        user.save()
            .then(() =>
                res
                    .status(201)
                    .json({ message: "Utilisateur créé avec succès !" })
            )
            .catch((error) => res.status(500).json({ error }));
    });
};

exports.login = (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            res.status(401).json({ error: "Utilisateur non trouvé !" });
        }
        bcrypt
            .compare(req.body.password, user.password)
            .then((valid) => {
                if (!valid) {
                    res.status(400).json({ error: "Mot de passe invalide !" });
                }
                res.status(200).json({
                    userId: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    nickname: user.nickname,
                    creationDate: user.creationDate,
                    token: jwt.sign(
                        { userId: user._id },
                        "RANDOM_TOKEN_SECRET",
                        {
                            expiresIn: "24h",
                        }
                    ),
                });
            })
            .catch((error) => res.status(500).json({ error }));
    });
};

// à ajouter à user : prénom / nom / pseudo
