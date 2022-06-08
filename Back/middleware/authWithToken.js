const jwt = require("jsonwebtoken")
require("dotenv").config()
const secretToken = process.env.SECRET_TOKEN

module.exports = (req, res, next) => {
    try {
        // const token = req.headers.authorization.split(" ")[1];
        const token = req.headers.authorization

        // if there is no token
        if (token === null || !token) {
            res.status(401).json({ error: "token not found !" })
        }
        //there is a token
        else {
            jwt.verify(token, secretToken, (err, decodedToken) => {
                // check the token
                if (err) {
                    res.json({ msg: "Invalid token  !", status: 403 })
                } else {
                    // it's good so we use user id from token to next request
                    req.body._id = decodedToken.userId
                    next()
                }
            })
        }
    } catch (error) {
        res.status(401).json({
            error: new Error("Invalid request"),
        })
    }
}
