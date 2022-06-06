const mongoose = require("mongoose")

const tokenSchema = mongoose.Schema({
    token: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 900,
    },
})

module.exports = mongoose.model("Token", tokenSchema)
