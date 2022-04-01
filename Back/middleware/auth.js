const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretToken = process.env.secretToken;

// comparer juste le token ou bien si c'est le token fait par l'id de l'utilisateur?
module.exports = (req, res, next) => {
    try {
        // const token = req.headers.authorization.split(" ")[1];
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, secretToken);
        const userId = decodedToken.userId;

        if (req.body.userId && req.body.userId != userId) {
            // throw "Invalid token or user !";
            res.json({ status: 401, data: { msg: "Invalid token or user !" } });
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({
            error: new Error("Invalid request"),
        });
    }
};
